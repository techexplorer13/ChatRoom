const express = require('express')
const router = express.Router()
const user = require('../model/user')
const bcrypt = require('bcrypt')


//Creating one user
router.post('/', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password,10)
        const users = new user({
            usrnm: req.body.name,
            password: hashedPassword
        })

        users.save();
        res.send(users.toJSON())
    } catch (error) {
        res.send(error).status(500)
    }
})


module.exports = router 