import { CartDAO } from "../dao/cart.dao.js"
import { createCart } from "../dao/dto/cart.dto.js"

class CartService{
    constructor (dao = new CartDAO()) {this.dao = dao}

    async cartCreate(data) {return await this.dao.create(createCart(data))}

}

export const cartService = new CartService()