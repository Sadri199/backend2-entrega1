import UserRouter from "./custom/user.router.js"
import ProductRouter from "./custom/product.router.js"
import OrderRouter from "./custom/order.router.js"

const userRoutes = new UserRouter()
const productRoutes = new ProductRouter()
const orderRoutes = new OrderRouter()

export function initRouting (app) {
    app.use("/api", userRoutes.router)
    app.use("/api/products", productRoutes.router)
    app.use("/api/orders", orderRoutes.router)

    app.use((req, res) => {
        res.status(404).json({ error: "Page not found!" })
    })
}