import UserRouter from "./custom/user.router.js"

const userRoutes = new UserRouter()

export function initRouting (app) {
    app.use("/api", userRoutes.router)

    app.use((req, res) => {
        res.status(404).json({ error: "Page not found!" })
    })
}