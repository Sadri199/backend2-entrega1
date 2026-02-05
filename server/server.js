import express from 'express'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import MongoStore from 'connect-mongo'
import passport from 'passport'

import env, {checkEnv} from '../config/env.config.js'
import {dbConnection} from '../config/db/connect.config.js'


const app = express()
const PORT = env.PORT
const SECRET_SESSION = env.SECRET_SESSION

app.use(express.json())
app.use(cookieParser(SECRET_SESSION))

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

    app.listen(PORT, () => console.log(`💻 Server running at http://localhost:${PORT} !!`))
}