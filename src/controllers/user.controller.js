import jwt from 'jsonwebtoken'

import { userService } from "../services/user.service.js"
import { cartService } from '../services/cart.service.js'
import env from "../config/env.config.js"

const jwtSecret = env.JWT_SECRET
const port = env.PORT

class UserController {
    async register(req, res) {
        try {
            const host = req.hostname
            const url = req.originalUrl
            const path = `http://${host}:${port}${url}`

            const emailCheck = await userService.emailCheck(req.body)
            if (emailCheck)
                return res.status(400).json({ error: `The email ${req.body.email} is already registered, try with a new one!` })

            const user = await userService.userCreate(req.body)
            const cart = await cartService.cartCreate(user)
            const resBody = userService.filterData(user)

            res.status(201).json({
                message: "Mercenary registered correctly!",
                user: {
                    first_name: resBody.first_name,
                    last_name: resBody.last_name,
                    callsign: resBody.callsign,
                    email: resBody.email,
                    age: resBody.age,
                    role: resBody.role
                },
                availableEndpoints: path.replace("register", "login")
            })
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }

    async login (req, res){
        try{
            const host = req.hostname
            const url = req.originalUrl
            const path = `http://${host}:${port}${url}`
            
            const {email, password} = req.body  //primera parte
            if(!email || !password){
                return res.status(400).json({error: "Missing Credentials!",
                    requiredFields: ["email", "password"]
                })
            }

            const user = await User.findOne({email}) //segunda parte
            if(!user){
                return res.status(400).json({error: "Invalid Credentials! Please validate the email or password you are using to login."})
            }

            const checkPassword = await bcrypt.compare(password, user.password) //tercera parte
            if(!checkPassword) 
                return res.status(400).json({error: "Invalid Credentials! Please validate the email or password you are using to login."})

            const payload = {id: String(user._id), email: user.email, role: user.role} //validacion y creación token, parte final
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
}

export const userController = new UserController()