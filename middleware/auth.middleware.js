import passport from 'passport'

export const checkJWTCookie = passport.authenticate('jwt-cookie', {session: false})

export function checkLogged(req, res, next) {
    if (req.cookies.access_token) {
        return res.status(403).json({ error: "You are logged in, you can't login again until you logout!" })
    }
    next()
}

