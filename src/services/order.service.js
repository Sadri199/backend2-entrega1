import { OrderDAO } from "../dao/order.dao.js"
import { formatOrder } from "../dao/dto/order.dto.js"

class OrderService{
    constructor (dao = new OrderDAO()) {this.dao = dao}

    async createOrder(data) {const creation = await this.dao.create(formatCreate(data)) //editar
        return filterProduct(creation)}
}

export const orderService = new OrderService()