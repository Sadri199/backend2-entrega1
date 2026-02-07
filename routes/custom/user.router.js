import { Router } from "express"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

import env from "../../config/env.config.js"
import { User } from "../../config/models/user.model.js"
import { checkLogged } from "../../middleware/auth.middleware.js"

const jwtSecret = env.JWT_SECRET


export default class UserRouter {
    constructor() {
        this.router = Router(),
        this.router.get("/", this.getHome)
        this.router.post("/register", this.register)
        this.router.post("/login", checkLogged, this.login)
    }

    makeURL (req) {
        const port = env.PORT
        const host = req.hostname
        const url = req.originalUrl
        const fullUrl = `http://${host}:${port}${url}`
        console.log(`${fullUrl} a ver`)
        return fullUrl
    }

    getHome = (req, res) => {
        try{
            const path = this.makeURL(req)

            res.status(200).json({message: "Welcome to ALLMIND's Database API. ALLMIND exists for all Mercenaries. Here are the available Endpoints for unauthenticated users:",
                availableEndpoints: [path+"register", path+"login"]
            })
        } catch (err){
            res.status(500).json({error: err.message})
        }
    }

    async register (req, res) {
        try{
            const {first_name, last_name, email, age, password, role} = req.body
            if(!first_name || !last_name || !email || !password){
                return res.status(400).json({error: "One or more mandatory values are missing!",
                    mandatoryFields: ["first_name", "last_name", "email", "password"],
                    optionalFields: ["age"]
                })
                return
            }

            const emailCheck = await User.findOne({email})
            if (emailCheck)
                return res.status(400).json({error: `The email ${email} is already registered, try with a new one!`})

            const hash = bcrypt.hashSync(password,10)
            const user = new User({first_name, last_name, email, password:hash, age, role})
            await user.save()

            res.status(201).json({message: "Mercenary registered correctly!",
                user: {
                    first_name,
                    last_name,
                    callsign: first_name + " " + last_name,
                    email,
                    age,
                    role
                }
            })
        } catch (err) {
            res.status(500).json({error: err.message})
        }
    }

    async login (req, res){
        try{
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
            token: "Check your cookies for the token!"})
        } catch (err){
            res.status(500).json({error: err.message})
        }
    }
}