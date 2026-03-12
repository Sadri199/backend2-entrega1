import bcrypt from "bcrypt"
import crypto from "crypto"
import jwt from 'jsonwebtoken'

import { userService } from "../services/user.service.js"
import { cartService } from '../services/cart.service.js'
import { mailerService } from "../services/mailer.service.js"
import env from "../config/env.config.js"

const port = env.PORT
const jwtSecret = env.JWT_SECRET

class UserController {
    async register(req, res) {
        try {
            const host = req.hostname
            const url = req.originalUrl
            const path = `http://${host}:${port}${url}`

            const emailCheck = await userService.emailCheck(req.body)
            if (emailCheck){
                return res.status(400).json({ error: `The email ${req.body.email} is already registered, try with a new one!` })
            }

            const user = await userService.userCreate(req.body)
            const cart = await cartService.cartCreate(user)
            const resBody = userService.filterData(user)

            const email = mailerService.send({
                to:user.email, 
                subject: `Allmind: Thank you for joining us ${resBody.callsign}!`,
                template: "welcome", 
                context: {name: resBody.callsign || "User"}
            })
            res.status(201).json({
                message: "Mercenary registered correctly! An email confirming your registration will arrive shortly.",
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

            const user = await userService.emailCheck(req.body)
            if(!user){
                return res.status(400).json({error: "Invalid Credentials! Please validate the email or password you are using to login."})
            }

            const formatPassword = userService.passwordCheck(req.body)
            const passwordCheck = await bcrypt.compare(formatPassword, user.password)
            if(!passwordCheck){
                return res.status(400).json({error: "Invalid Credentials! Please validate the email or password you are using to login."})
            }

            const payload = {id: String(user._id), email: user.email, role: user.role} 
            const token = jwt.sign(payload, jwtSecret, {expiresIn: "1h"})
            const filtered = userService.filterData(user)
            
            res.cookie("access_token", token, {
                httpOnly: true,
                sameSite: "lax",
                secure: false,
                maxAge: 60 * 60 * 1000,
                path: "/"
            })
            res.status(200).json({message: `Credentials confirmed for callsign: ${filtered.callsign}! You have logged in successfully!`,
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

            const user = await userService.emailCheck(req.user)
            if (!user){
                return res.status(404).json({error: "User not found in Database! Check your token and login again!"})
            }
            const cart = await cartService.cartFind(user)   

            if(user.role == "admin"){
                const filter = userService.filterAdminData(user)
                return res.status(200).json({message: `Callsign: ${filter.callsign} you have been given Administrative Access, validate your information with discretion!`,
                adminData: {
                    first_name: filter.first_name,
                    last_name: filter.last_name, 
                    email: filter.email,
                    age: filter.age,
                    role: filter.role,
                    _id: filter._id, 
                    createdAt: filter.createdAt, 
                    updatedAt: filter.updatedAt},
                    cart: {products: cart?.products},
                availableEndpoints: path.replace("current", "logout")})
            } else {
                const filter = userService.filterData(user)
                res.status(200).json({message: `Callsign: ${filter.callsign} this is your information!`,
                userData: {
                    first_name: filter.first_name,
                    last_name: filter.last_name, 
                    email: filter.email,
                    age: filter.age,
                    role: filter.role},
                cart: {products: cart?.products},
                availableEndpoints: path.replace("current", "logout")})
            }
        } catch (err) {
            res.status(500).json({error: err.message})
        }
    }

    async requestReset (req, res){
        try{
            const host = req.hostname
            const url = req.originalUrl
            const path = `http://${host}:${port}${url}`
            const user = await userService.emailCheck(req.body)
            if(!user){
                    return res.status(400).json({error: "Invalid email! Please validate that the email is registered."})
            }

            const {_id, callsign} = user
            const resetToken = crypto.randomBytes(32).toString("hex")
            const lifeSpan = 60*60*1000
            const createdAt = Date.now()
            const expiryDate = createdAt + lifeSpan
            const token = await bcrypt.hash(resetToken, 10)
            const temporalToken = {
                token,
                expiryDate
            }

            const saveTemporalToken = await userService.updateTempToken(user,temporalToken)
            if(!saveTemporalToken){
                return res.status(500).json({error: "There was a problem generating the temporal token!"})
            }
            const formatLink = path.replace("reset-password", "newPassword")
            const link = `${formatLink}?token=${token}&_id=${_id}`
            const newEmail = mailerService.send({
                to: req.body.email, 
                subject: `Allmind: ${callsign} reset your password!`,
                template: "requestReset", 
                context: {callsign: callsign || "User",
                    link: link
                }
            })
            res.status(200).json({message: `We will send you an email with a link to reset your password!`})
        } catch (err) {
            res.status(500).json({error: err.message})
        }
    }

    async resetPassword(req, res){
        try{
            const host = req.hostname
            const url = req.originalUrl
            const path = `http://${host}:${port}${url}`
            const {_id, token} = req.query
            const {newPassword} = req.body
            
            if(!_id || !token || !newPassword){
                return res.status(400).json({error: "Missing values, _id and token must come from path parameters. newPassword must come from the body of the request!"})
            }
            const user = await userService.getTempToken({_id})
            if(!user){
                return res.status(400).json({error: "Invalid UserID! Please validate the information you are entering."})
            }
            if(!user.resetToken.token){
                return res.status(400).json({error: "The token no longer exists, generate a new one by resetting your password."})
            }
            
            const {resetToken, email, callsign} = user
            const now = Date.now()
            const tokenDate = resetToken.expiryDate
            if(now > tokenDate){
                return res.status(400).json({error: "Token expired, generate a new one by resetting your password."})
            }
            if(token !== resetToken.token){
                return res.status(400).json({error: "Token is incorrect, validate that you are entering the correct one or generate a new one by resetting your password."})
            }

            const samePassword = await bcrypt.compare(newPassword, user.password)
            if (samePassword){ 
                return res.status(400).json({error: "You can't use the previous password, choose a new one."})
            }

            const savePassword = await userService.updatePassword(user._id, {newPassword})
            if(!savePassword){
                return res.status(500).json({error: "We couldn't change your password."})
            }

            const newEmail = mailerService.send({
                to: email, 
                subject: `Allmind: ${callsign}, your password has been reset!`,
                template: "resetConfirm", 
                context: {callsign: callsign || "User",
                }
            })
            res.status(200).json({message: `We changed your password, now go to Login!`,
                availableEndpoints: "http://localhost:8000/api/login"
            })
        } catch (err) {
            res.status(500).json({error: err.message})
        }
    }

    async logout (req, res){
        try{
            res.clearCookie('access_token', { path: '/' })
            res.status(202).json({ message: "Mercenary logout, thank you for visiting ALLMIND. ALLMIND exists for all Mercenaries!" })
        } catch (err){
            res.status(500).json({error: err.message})
        }
    }
}


export const userController = new UserController()