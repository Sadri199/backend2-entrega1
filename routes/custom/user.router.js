import { Router } from "express"
import bcrypt from "bcrypt"

import env from "../../config/env.config.js"
import { User } from "../../config/models/user.model.js"


export default class UserRouter {
    constructor() {
        this.router = Router(),
        this.router.get("/", this.getHome)
        this.router.post("/register", this.register)
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
}