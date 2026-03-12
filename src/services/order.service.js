import { OrderDAO } from "../dao/order.dao.js"
import { formatOrder, filterOrder, orderId, orderEmail, formatUpdate, formatFinish } from "../dao/dto/order.dto.js"

class OrderService{
    constructor (dao = new OrderDAO()) {this.dao = dao}

    async createOrder(data) {const creation = await this.dao.create(formatOrder(data))
        return filterOrder(creation)
    }

    async getOrderById(data) {const order = await this.dao.findById(orderId(data))
        return filterOrder(order)
    }

    async getOrderWithPopulate(data, doc) {return await this.dao.findByIdWithPopulate(orderId(data), `products.${doc}`) 
    }

    async getOrderByEmail(data) {return await this.dao.getByEmail(orderEmail(data))}

    async updateOrder(id, data) {return await this.dao.findByIdAndUpdate(orderId(id),
    formatUpdate(data))}

    async finishOrder(id, data) {return await this.dao.findByIdAndUpdate(orderId(id),
    formatFinish(data))}
}

export const orderService = new OrderService()