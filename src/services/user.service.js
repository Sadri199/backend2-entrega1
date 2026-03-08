import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import crypto from "crypto"

import { UserDAO } from "../dao/user.dao.js"
import { CartDAO } from "../dao/cart.dao.js"
import { createUser, 
    checkEmail, 
    dataFilter, 
    checkPassword, 
    getUserById, 
    dataFilterAdmin, 
    addTemporalToken} from "../dao/dto/user.dto.js"
import { getOrCreateCart } from "../dao/dto/cart.dto.js"
import env from "../config/env.config.js"

const jwtSecret = env.JWT_SECRET

class UserService{
    constructor (dao = new UserDAO(), daoCart = new CartDAO()) {
        this.dao = dao
        this.daoCart = daoCart
    }

    async userCreate(data) {return await this.dao.create(createUser(data))}
    async emailCheck(data) {return await this.dao.findOne(checkEmail(data))}

    filterData(data) {return dataFilter(data)}

    async login(data){
        const user = await this.dao.findOne(checkEmail(data))
        if(!user){
                return res.status(400).json({error: "Invalid Credentials! Please validate the email or password you are using to login."})
            }
        
        const formatPassword = checkPassword(data)
        const passwordCheck = await bcrypt.compare(formatPassword, user.password)
        if(!passwordCheck) 
                return res.status(400).json({error: "Invalid Credentials! Please validate the email or password you are using to login."})
        
        const payload = {id: String(user._id), email: user.email, role: user.role} 
        const token = jwt.sign(payload, jwtSecret, {expiresIn: "1h"})
        const filtered = dataFilter(user)

        return {token, filtered} 
    }

    async getUser(data){
        const user = await this.dao.findById(getUserById(data))
        if (!user) 
            return res.status(404).json({error: "User not found in Database! Check your token and login again!"})

        const cart = await this.daoCart.findCart(getOrCreateCart(user._id))

        if (user.role === "admin"){
            const filter = dataFilterAdmin(user)
            return {cart, filter}
        } else {
            const filter = dataFilter(user)
            return {cart, filter}
        }
    }

    async requestReset(data, path){
        const user = await this.dao.findOne(checkEmail(data))
        if(!user){
                return res.status(400).json({error: "Invalid email! Please validate that the email is registered."}) //las res en controller, aca solo throw new error, cambiar todo
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
        const saveTemporalToken = await this.dao.findByIdAndUpdate({_id}, addTemporalToken(temporalToken))
        if(!saveTemporalToken){
            console.log("fallo el update del token temporal")
            return res.status(500).json({error: "There was a problem generating the temporal token!"})
        }
        
        const link = `${path}/passwordReset?token=${token}&id=${_id}`
        return {callsign, link}
    }

    async resetPassword(data){

    }
}

export const userService = new UserService()