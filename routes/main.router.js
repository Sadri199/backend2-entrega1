import homeRouter from './home.router.js'

export function initRouting (app) {
    app.use("/", homeRouter)

    app.use((req, res) => {
        res.status(404).json({ error: "Page not found!" })
    })
}