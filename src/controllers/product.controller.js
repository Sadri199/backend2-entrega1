import { productService } from "../services/product.service.js"

class ProductController {
    async createProduct(req, res) {
        try {
            const product = await productService.createProduct(req.body)

            res.status(201).json({  
                message: `Product ${product.title} was added successfully!`,
                product
            })
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }

    async getProducts(req, res) {
        try {
            const products = await productService.getAllProducts()
            res.status(200).json({productList: products})
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }

    async updateProduct(req, res) {
        try {
            const update = await productService.updateProduct(req.body)
            if(!update)
                return res.status(400).json({error: "Invalid data! Please validate that you are sending the '_id' field and another field for editing the product. Valid fields to edit: 'title, description, price, code, status, stock, category, thumbnail'."})

            res.status(200).json({updated_product: update})
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }

    async deleteProduct(req, res) {
        try {
            const deleteMe = await productService.deleteProduct(req.body)
            if(!deleteMe)
                return res.status(400).json({error: "Invalid data! Please validate that you are sending the '_id' field to erase that product."})

            res.status(204).json({erased_product: deleteMe})
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }
}


export const productController = new ProductController()