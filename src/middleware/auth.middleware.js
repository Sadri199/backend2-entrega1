import passport from 'passport'

export const checkJWTCookie = passport.authenticate('jwt-cookie', {session: false})

export function checkLogged(req, res, next) {
    if (req.cookies.access_token) {
        return res.status(403).json({ error: "You are logged in, you can't login again until you logout!" })
    }
    next()
}

// const jwt = require('jsonwebtoken'); //o acá o en passport

// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // Your JWT
// const secret = 'your-256-bit-secret';

// try {
//   const decoded = jwt.verify(token, secret);
//   console.log('Token is valid. Decoded payload:', decoded);
// } catch (err) {
//   if (err.name === 'TokenExpiredError') {
//     console.log('Token has expired!');
//   } else {
//     console.log('Token invalid:', err.message);
//   }
// }