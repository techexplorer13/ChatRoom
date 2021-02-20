const express = require('express')
const router = express.Router()
const links = require('../model/showlinks');


router.get("/gethomelinks",async (req, res) => {

    const linksData=await links.find({});
    res.status(200).json(linksData);
    
})

module.exports=router