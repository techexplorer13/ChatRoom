require('dotenv').config()

const express = require('express')
const router = express.Router()
const user = require('../model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const utility=require('../utility/utility')
const authenticate = require('../utility/utility')


//Creating one user
router.post('/', async (req, res) => {

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const users = new user({
            usrnm: req.body.name,
            password: hashedPassword,
            email: req.body.email
        })

        users.save();
        res.send(users.toJSON())
    } catch (error) {
        res.send(error).status(500)
    }
})

//Autheticate user
router.post('/login', async (req, res) => {
    const reqUserName = req.body.username;
    const jwtUserJson = { name: reqUserName }
    const userMdb = await user.findOne({usrnm:reqUserName})

    console.log(userMdb)
    if (userMdb == null) {
        return res.status(400).send("Cannot find user")
    }
    try {
        if (await bcrypt.compare(req.body.password, userMdb.password)) {
            //if the authentication is successful generate a jwt token
            const access_token = jwt.sign(jwtUserJson, process.env.ACCESS_TOKEN_SECRET,{expiresIn : "15s"})
            res.status(200).json({ access_token: access_token })
        } else {
            res.send("Not A Valid User")
        }
    } catch {
        res.status(500).send();
    }
});


router.post('/getUserAuthentication', (req,res,next)=>{
    authenticate(res,req,next);
})

module.exports = router 