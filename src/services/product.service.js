import { ProductDAO } from "../dao/product.dao.js"
import { createProduct, formatCreate } from "../dao/dto/product.dto.js"

class ProductService{
    constructor (dao = new CartDAO()) {this.dao = dao}

    async create(data) {return await this.dao.create(formatCreate(data))}
}

export const productService = new ProductService()