import { BaseDAO } from "./base.dao.js"
import { Order } from "../config/models/order.model.js"

export class OrderDAO extends BaseDAO {
    constructor() {super(Order)}
}