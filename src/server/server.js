import express from 'express'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import MongoStore from 'connect-mongo'
import path from 'path'
import { engine } from 'express-handlebars'
import { fileURLToPath  } from 'url'

import env, {checkEnv} from '../config/env.config.js'
import {dbConnection} from '../config/db/connect.config.js'
import { initPassport } from '../config/auth/passport.config.js'
import logger from '../middleware/logger.middleware.js'
import { initRouting } from '../routes/main.router.js'
import { hbsHelpers } from './hbs.helper.js'


const app = express()
const PORT = env.PORT
const SECRET_SESSION = env.SECRET_SESSION
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.json())
app.use(cookieParser(SECRET_SESSION))
app.use(logger)

export const initServer = async () => {

    checkEnv()
    await dbConnection()

    const store = MongoStore.create({
        client: ((await import("mongoose")).default.connection.getClient()),
        ttl: 60 * 60
    })
    app.use(
        session({
            secret: SECRET_SESSION,
            resave: false,
            saveUninitialized: false,
            store,
            cookie: {
                maxAge: 1 * 60 * 60 * 1000,
                httpOnly: true,
                signed: true
            }
        })
    )

    app.engine('handlebars', engine({
        defaultLayout: 'main',
        layoutDir: path.join(__dirname, '../views/layouts'),
        helpers: hbsHelpers
    }))
    app.set('view engine', 'handlebars');
    app.set('views', path.join(__dirname, '../views'));

    initPassport()
    initRouting(app)

    app.listen(PORT, () => console.log(`💻 Server running at http://localhost:${PORT} !!`))
}