export function checkRoles(...roles) {
    return (req, res, next) => {
        if (!req.user) 
            return res.status(401).json({ error: "'user' is missing from the request, validate that you have logged in successfully." })
        if (!roles.includes(req.user.role)) 
            return res.status(403).json({ error: "You don't have enough privileges to use this Endpoint!" })
        next()
    }
}