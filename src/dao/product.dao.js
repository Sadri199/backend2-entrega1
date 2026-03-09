import { BaseDAO } from "./base.dao.js"
import { Product } from "../config/models/products.model.js"

export class ProductDAO extends BaseDAO {
    constructor() {super(Product)}
}