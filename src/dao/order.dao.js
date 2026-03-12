import { BaseDAO } from "./base.dao.js"
import { Order } from "../config/models/order.model.js"

export class OrderDAO extends BaseDAO {
    constructor() {super(Order)}

    async getByEmail(dto) {
        return await this.model.find({dto}).lean()
    }

    async findByIdWithPopulate(id, populatePath) {
        return await this.model.findById(id).populate(populatePath).lean()
    }
}