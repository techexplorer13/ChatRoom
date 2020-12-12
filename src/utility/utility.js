//middleware authetication to check if token is valid
const authenticate=function authenticateToken(res, req, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, jwtUserJson) => {
        if (err) return res.sendStatus(403)
        req.user = jwtUserJson
        next()
    })

}

module.exports=authenticate;