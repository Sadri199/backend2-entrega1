import { orderService } from "../services/order.service.js"
import env from "../config/env.config.js"

const port = env.PORT

class OrderController {
    async createOrder(req, res) {
        try {
            const order = await orderService.createOrder(req.body)

            res.status(201).json({  
                message: `Order was placed successfully, remember to confirm it!`,
                order
            })
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }
}


export const orderController = new OrderController()