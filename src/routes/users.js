const express = require('express')
const router = express.Router()
const user = require('../model/user')

//Creating one user
router.post('/', async (req, res) => {

    const users = new user({
        usrnm: req.body.name,
        password: req.body.password
    })

    users.save().then(res=>{
        console.log(res)
    })
    res.send(users.toJSON())
  
})


module.exports = router 