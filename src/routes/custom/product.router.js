import { Router } from "express"

import { productController } from "../../controllers/product.controller.js"
import { checkJWTCookie} from "../../middleware/auth.middleware.js"
import { checkRoles } from "../../middleware/policies.middleware.js"


export default class ProductRouter {
    constructor() {
        this.router = Router(),
        this.router.post("/",
            checkJWTCookie,
            checkRoles("admin"), 
            productController.createProduct)
        this.router.get("/", checkJWTCookie,
            checkRoles("admin", "user"),
            productController.getProducts)
        this.router.put("/", checkJWTCookie,
            checkRoles("admin"),
            productController.updateProduct)
        this.router.delete("/", checkJWTCookie,
            checkRoles("admin"),
            productController.deleteProduct)
    }
}