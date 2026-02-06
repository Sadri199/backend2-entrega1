import { Router } from "express"
import env from "../config/env.config.js"

const router = Router()
const port = env.PORT

router.get('/', (req, res) => {
    const host = req.hostname
    const url = req.originalUrl

    const fullUrl = `http://${host}:${port}${url}`
    res.status(200).json({message: "Welcome to ALLMIND's Database API. ALLMIND exists for all Mercenaries. Here are the available Endpoints for Users without Access:",
        availableEndpoints: [fullUrl+"register", fullUrl+"login"]
    })
})

export default router