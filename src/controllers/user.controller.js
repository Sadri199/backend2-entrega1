import { userService } from "../services/user.service.js"
import { cartService } from '../services/cart.service.js'
import env from "../config/env.config.js"

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

            const {token, filtered} = await userService.login(req.body)

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
    
                const user = await userService.getUser(req.user)
    
                const {cart, filter} = user
    
                if(filter.role == "admin"){
                    return res.status(200).json({message: `Callsign: ${filter.callsign} you have been given Administrative Access, validate your information with discretion!`,
                    adminData: {first_name: filter.first_name,
                        last_name: filter.last_name, 
                        email: filter.email,
                        age: filter.age,
                        role: filter.role,
                        _id: filter._id, 
                        createdAt: filter.createdAt, 
                        updatedAt: filter.updatedAt},
                    cart: {products: cart?.products},
                    availableEndpoints: path.replace("current", "logout")})
                }
    
                res.status(200).json({message: `Callsign: ${filter.callsign} this is your information!`,
                userData: {first_name: filter.first_name,
                        last_name: filter.last_name, 
                        email: filter.email,
                        age: filter.age,
                        role: filter.role},
                cart: {products: cart?.products},
                availableEndpoints: path.replace("current", "logout")})
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