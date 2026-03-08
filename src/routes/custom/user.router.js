import { Router } from "express"

import env from "../../config/env.config.js"
import { userController } from "../../controllers/user.controller.js"
import { checkLogged, checkJWTCookie, checkTokenExpiration} from "../../middleware/auth.middleware.js"
import { checkRoles } from "../../middleware/policies.middleware.js"

const port = env.PORT


export default class UserRouter {
    constructor() {
        this.router = Router(),
        this.router.get("/", this.getHome)
        this.router.post("/register", checkLogged, userController.register)
        this.router.post("/login", checkLogged, userController.login)
        this.router.post("/reset-password", checkLogged, userController.requestReset)
        this.router.get("/current", checkTokenExpiration, checkJWTCookie, checkRoles("user", "admin"), userController.getCurrentUser)
        this.router.post("/logout", checkTokenExpiration, checkJWTCookie, userController.logout)
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
}