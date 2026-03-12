import { BaseDAO } from "./base.dao.js"
import { Order } from "../config/models/order.model.js"

export class OrderDAO extends BaseDAO {
    constructor() {super(Order)}

    async getByEmail(dto) {
        return await this.model.find(dto).lean()
    }

    async findByIdWithPopulate(id, populatePath) {
        return await this.model.findById(id).populate(populatePath).lean()
    }

    async getAllPaginate({ page = 1, limit = 10, status } = {}) { //I tried to build my own version but this was way better done
        const filter = {}
        if (status) filter.status = status
        const skip = ( page - 1 ) * limit
        const [products, total] = await Promise.all([
            this.model.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
            this.model.countDocuments(filter)
        ]);
        return { products, page, limit, total, pages: Math.ceil(total / limit) }
    }
}