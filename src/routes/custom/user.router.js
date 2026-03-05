import { Router } from "express"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

import env from "../../config/env.config.js"
import { User } from "../../config/models/user.model.js"
import { Cart } from "../../config/models/cart.model.js"
import { checkLogged, checkJWTCookie } from "../../middleware/auth.middleware.js"
import { checkRoles } from "../../middleware/policies.middleware.js"

const jwtSecret = env.JWT_SECRET
const port = env.PORT


export default class UserRouter {
    constructor() {
        this.router = Router(),
        this.router.get("/", this.getHome)
        this.router.post("/register", this.register)
        this.router.post("/login", checkLogged, this.login)
        this.router.get("/current", checkJWTCookie, checkRoles("user", "admin"), this.getCurrentUser)
        this.router.post("/logout", checkJWTCookie, this.logout)
    }

    getHome = (req, res) => {
        try{
            const host = req.hostname
            const url = req.originalUrl
            const path = `http://${host}:${port}${url}`

            res.status(200).json({message: "Welcome to ALLMIND's Database API. ALLMIND exists for all Mercenaries. Here are the available Endpoints for unauthenticated users:",
                availableEndpoints: [path+"/register", path+"/login"]
            })
        } catch (err){
            res.status(500).json({error: err.message})
        }
    }

    async register (req, res) {
        try{
            const host = req.hostname
            const url = req.originalUrl
            const path = `http://${host}:${port}${url}`

            const {first_name, last_name, email, age, password, role} = req.body
            if(!first_name || !last_name || !email || !password){
                return res.status(400).json({error: "One or more mandatory values are missing!",
                    mandatoryFields: ["first_name", "last_name", "email", "password"],
                    optionalFields: ["age"]
                })}

            const emailCheck = await User.findOne({email})
            if (emailCheck)
                return res.status(400).json({error: `The email ${email} is already registered, try with a new one!`})

            const hash = bcrypt.hashSync(password,10)
            const user = new User({first_name, last_name, email, password:hash, age, role})
            await user.save()

            const cart = new Cart ({products: [], user: user._id})
            await cart.save()

            res.status(201).json({message: "Mercenary registered correctly!",
                user: {
                    first_name,
                    last_name,
                    callsign: first_name + " " + last_name,
                    email,
                    age,
                    role
                },
                availableEndpoints: path.replace("register", "login")
            })
        } catch (err) {
            res.status(500).json({error: err.message})
        }
    }

    async login (req, res){
        try{
            const host = req.hostname
            const url = req.originalUrl
            const path = `http://${host}:${port}${url}`
            
            const {email, password} = req.body
            if(!email || !password){
                return res.status(400).json({error: "Missing Credentials!",
                    requiredFields: ["email", "password"]
                })
            }

            const user = await User.findOne({email})
            if(!user){
                return res.status(400).json({error: "Invalid Credentials! Please validate the email or password you are using to login."})
            }

            const checkPassword = await bcrypt.compare(password, user.password)
            if(!checkPassword) 
                return res.status(400).json({error: "Invalid Credentials! Please validate the email or password you are using to login."})

            const payload = {id: String(user._id), email: user.email, role: user.role}
            const token = jwt.sign(payload, jwtSecret, {expiresIn: "1h"})

            res.cookie("access_token", token, {
                httpOnly: true,
                sameSite: "lax",
                secure: false,
                maxAge: 60 * 60 * 1000,
                path: "/"
            })

            res.status(200).json({message: `Credentials confirmed for callsign: ${user.first_name+" "+user.last_name}! You have logged in successfully!`,
            token: "Check your cookies for the token!",
            availableEndpoints: [path.replace("login", "current"), 
                path.replace("login", "logout")]})
        } catch (err){
            res.status(500).json({error: err.message})
        }
    }

    async getCurrentUser (req, res){
        try{
            const host = req.hostname
            const url = req.originalUrl
            const path = `http://${host}:${port}${url}`

            const user = await User.findById(req.user._id)
            if (!user) 
                return res.status(404).json({error: "User not found in Database! Check your token or login again!"})

            const cart = await Cart.findOne({user: req.user._id}).populate({
                path: "user"
            })

            const {first_name, last_name, email, age, role} = user

            if(user.role == "admin"){
                const {first_name, last_name, email, age, role, _id, createdAt, updatedAt} = user
                return res.status(200).json({message: `Callsign: ${first_name+" "+last_name} you have been given Administrative Access, validate your information with discretion!`,
                superUser: {first_name, last_name, email, age, role, _id, createdAt, updatedAt},
                cart: {products: cart?.products},
                availableEndpoints: path.replace("current", "logout")})
            }

            res.status(200).json({message: `Callsign: ${first_name+" "+last_name} this is your information!`,
            userData: {first_name, last_name, email, age, role},
            cart: {products: cart?.products},
            availableEndpoints: path.replace("current", "logout")})
        } catch (err) {
            res.status(500).json({error: err.message})
        }
    }

    async logout (req, res){
        try{
            res.clearCookie('access_token', { path: '/' });
            res.status(202).json({ message: "Mercenary logout, thank you for visiting ALLMIND. ALLMIND exists for all Mercenaries!" })
        } catch (err){
            res.status(500).json({error: err.message})
        }
    }
}