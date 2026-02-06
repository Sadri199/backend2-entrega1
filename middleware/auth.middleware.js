import passport from 'passport'

export const checkJWTCookie = passport.authenticate('jwt-cookie', {session: false})

