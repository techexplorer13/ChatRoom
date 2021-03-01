const express = require('express')
const router = express.Router()
const links = require('../model/showlinks');
const mediashows=require('../model/mediashows')


router.get("/gethomelinks",async (req, res) => {
    let filter={"category": {$exists:false}}
    const linksData=await links.find(filter);
    res.status(200).json(linksData);
    
})

router.post("/getAllMatchingShows",async(req,res)=>{
   let srctxt=req.body.searchtxt;
   let filter={"title":new RegExp('.*'+srctxt+'.*',"i")}
   const results=await mediashows.find(filter);
   res.status(200).json(results)
})

router.get("/getAllTrendingMovies",async(req,res)=>{
    let filter={"category":"movies"}
    const results=await links.find(filter);
    res.status(200).json(results)
 })

module.exports=router