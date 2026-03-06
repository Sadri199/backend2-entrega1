import { BaseDAO } from "./base.dao.js"
import { Cart } from "../config/models/cart.model.js"

export class CartDAO extends BaseDAO {
    constructor() {super(Cart)} 

    async createCart(dto){ return await this.model.create(dto)}
}