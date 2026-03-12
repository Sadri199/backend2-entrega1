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
        this.router.get("/:id", 
            checkJWTCookie,
            checkRoles("admin"),
            orderController.getOrder)
        this.router.get("/admin/getall", 
            checkJWTCookie,
            checkRoles("admin"),
            orderController.getAllOrders)
        this.router.get("/email/:email", 
            checkJWTCookie,
            checkRoles("admin","user"),
            orderController.getOrderByEmail)
        this.router.put("/:id", checkJWTCookie,
            checkRoles("admin", "user"),
            orderController.updateOrder)
        this.router.put("/confirm/:id", checkJWTCookie,
            checkRoles("admin", "user"),
            orderController.confirmOrder)
        this.router.delete("/:id", checkJWTCookie,
            checkRoles("admin"),
            orderController.deleteOrder)
    }
}