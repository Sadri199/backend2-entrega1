import { Router } from "express"

import { orderController } from "../../controllers/order.controller.js"
import { checkJWTCookie} from "../../middleware/auth.middleware.js"
import { checkRoles } from "../../middleware/policies.middleware.js"


export default class OrderRouter {
    constructor() {
        this.router = Router(),
        this.router.post("/",
            checkJWTCookie,
            checkRoles("admin", "user"), 
            orderController.createOrder)
        // this.router.get("/", checkJWTCookie,
        //     checkRoles("admin", "user"),
        //     productController.getProducts)
        // this.router.put("/", checkJWTCookie,
        //     checkRoles("admin"),
        //     productController.updateProduct)
        // this.router.delete("/", checkJWTCookie,
        //     checkRoles("admin"),
        //     productController.deleteProduct)
    }
}