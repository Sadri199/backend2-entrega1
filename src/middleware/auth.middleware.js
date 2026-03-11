import passport from 'passport'
import jwt from 'jsonwebtoken'

import env from "../config/env.config.js"

const jwtSecret = env.JWT_SECRET

export const checkJWTCookie = (req, res, next) => {
    passport.authenticate('jwt-cookie', {session: false}, (err, user, info) => {
    if (err) return next(err)
    if (!user) return res.status(401).json({ error: 'Missing, Invalid or Expired Token, please login again!',
        details: info?.message
    })
    req.user = user
    const token = req.cookies.access_token
    try {
    const verify = jwt.verify(token, jwtSecret)
    } catch (err) {
    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({error: "Your token has expired, please login again!"})
    }}
    next()
    })(req, res, next)
} 

// export function checkTokenExpiration(req, res, next){ //It looks like it doesn't do anything
//     const token = req.cookies.access_token
//     try {
//     const verify = jwt.verify(token, jwtSecret)
//     } catch (err) {
//     if (err.name === 'TokenExpiredError') {
//         return res.status(401).json({error: "Your token has expired, please login again!"})
//     }}
//     next()
// }

export function checkLogged(req, res, next) {
    if (req.cookies.access_token) {
        return res.status(403).json({ error: "You are logged in and you can't use this Endpoint until you logout!" })
    }
    next()
}
