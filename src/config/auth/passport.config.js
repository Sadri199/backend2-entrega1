import passport from 'passport'
import bcrypt from 'bcrypt'
import { Strategy as JwtStrategy } from 'passport-jwt'
import {User} from '../models/user.model.js'

import env from '../env.config.js'

const secret = env.JWT_SECRET

function cookieExtractor(req) {
    if (req && req.cookies && req.cookies.access_token) {
        return req.cookies.access_token;
    }
    return null
}

export function initPassport () {
    passport.use("jwt-cookie", new JwtStrategy(
        {
            jwtFromRequest: cookieExtractor,
            secretOrKey: secret
        },
        async (payload, done) =>{
            try {
                const user = await User.findById(payload.id).lean()
                if (!user) 
                    return done(null, false)
                return done(null, { _id: user._id, email: user.email, role: user.role })
            } catch (err) 
                { return done(err) }
        }
    ))
}