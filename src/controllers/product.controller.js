import { productService } from "../services/product.service.js"
import env from "../config/env.config.js"

const port = env.PORT

class ProductController {
    async createProduct(req, res) {
        try {
            const emailCheck = await userService.emailCheck(req.body) //Primera parte
            if (emailCheck)
                return res.status(400).json({ error: `The email ${req.body.email} is already registered, try with a new one!` })

            const user = await userService.userCreate(req.body)

            res.status(201).json({  
                message: `Product ${algo} was added successfully!`,
                product: {
                    first_name: resBody.first_name,
                    last_name: resBody.last_name,
                    callsign: resBody.callsign,
                    email: resBody.email,
                    age: resBody.age,
                    role: resBody.role
                }
            })
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }

}


export const productController = new ProductController()