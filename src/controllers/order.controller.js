import { orderService } from "../services/order.service.js"
import { productService } from "../services/product.service.js"
import { mailerService } from "../services/mailer.service.js"

class OrderController {
    async createOrder(req, res) {
        try {
            const order = await orderService.createOrder(req.body)

            const newEmail = mailerService.send({
                to: order.clientEmail, 
                subject: `Allmind: ${order.clientName} you have an order pending!`,
                template: "orderPending", 
                context: {clientName: order.clientName || "User",
                    code: order.code,
                    products: order.products,
                    totalPrice: order.totalPrice,
                    _id: order._id,
                    status: order.status,
                }
            })

            res.status(201).json({  
                message: `Order was placed successfully, remember to confirm it!`,
                order
            })
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }

    async getOrder(req, res) {
        try {
            const _id = req.params.id
            const order = await orderService.getOrderById(_id) 

            res.status(200).json({order})
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }

    async getOrderByEmail(req, res){ //da un body vacio no terminado
        try {
            const email = req.params.email
            if(req.user.email !== req.params.email && req.user.role !== "admin"){
                return res.status(403).json({error: "Users with 'user' role can only search for orders that match their own email."})
            }
            const order = await orderService.getOrderByEmail(email)

            res.status(200).json({order})
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }

    async updateOrder(req, res) {
        try {
            const _id = req.params.id
            const order = await orderService.updateOrder(_id, req.body)

            res.status(200).json({order})
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }

    async confirmOrder(req, res) {
        try {
            const _id = req.params.id
            const order = await orderService.getOrderWithPopulate(_id, "productId")
            if(order.status === "confirmed"){
                return res.status(400).json({error: "Order is already confirmed, cannot confirm again."})
            }

            const {products} = order
            const originalStock = products[0].productId.stock
            const quantity = products[0].productQuantity
            const realStock = originalStock - quantity
            if(realStock < 0){
                return res.status(400).json({error: "'productQuantity' cannot be lower than 'productId.stock'. Order cannot be completed, it will stay in pending."})
            }
            products[0].productId.stock = realStock
            const updateProduct = await productService.updateProduct(products[0].productId)

            order.status = "confirmed"
            const updateOrder = await orderService.finishOrder(_id, order.status)

            const newEmail = mailerService.send({
                to: order.clientEmail, 
                subject: `Allmind: ${updateOrder.clientName} you have completed your order!`,
                template: "orderConfirm", 
                context: {clientName: updateOrder.clientName || "User",
                    code: updateOrder.code,
                    products: updateOrder.products,
                    totalPrice: updateOrder.totalPrice,
                    _id: updateOrder._id,
                    status: updateOrder.status,
                }
            })

            res.status(200).json({updateOrder})
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }
}


export const orderController = new OrderController()