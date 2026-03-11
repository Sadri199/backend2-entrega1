import { ProductDAO } from "../dao/product.dao.js"
import { filterProduct, formatCreate, formatUpdate, getId } from "../dao/dto/product.dto.js"

class ProductService{
    constructor (dao = new ProductDAO()) {this.dao = dao}

    async createProduct(data) {const creation = await this.dao.create(formatCreate(data))
        return filterProduct(creation)}

    async getAllProducts() {return await this.dao.find({}, {select: "-__v"})}

    async updateProduct(data) {return await this.dao.findByIdAndUpdate(getId(data),
        formatUpdate(data))}

    async deleteProduct(data) {return await this.dao.findByIdAndDelete(getId(data))}
}

export const productService = new ProductService()