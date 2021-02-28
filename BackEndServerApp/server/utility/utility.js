//middleware authetication to check if token is valid

const jwt = require('jsonwebtoken')

const authenticate=function authenticateToken(res, req, next) {
    console.log(req.body)
    const authHeader = req.body['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return  res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, jwtUserJson) => {
        if (err) return res.sendStatus(403)
        req.user = jwtUserJson
        return res.status(200).json({user:jwtUserJson})
    })
}

module.exports=authenticate;