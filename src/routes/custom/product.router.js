import { Router } from "express"

import env from "../../config/env.config.js"
import { productController } from "../../controllers/product.controller.js"
import { checkJWTCookie, checkTokenExpiration} from "../../middleware/auth.middleware.js"
import { checkRoles } from "../../middleware/policies.middleware.js"

const port = env.PORT


export default class ProductRouter {
    constructor() {
        this.router = Router(),
        this.router.post("/register", checkRoles("admin"), 
            checkTokenExpiration, 
            checkJWTCookie, 
            userController.register) //create
        this.router.get("/", this.getHome) //getAll
        this.router.put("/newPassword", checkRoles("admin"), 
            checkTokenExpiration, 
            checkJWTCookie, 
            userController.resetPassword) //update
        this.router.delete("/logout", checkRoles("admin"),
            checkTokenExpiration, 
            checkJWTCookie, 
            userController.logout) //delete
    }
}