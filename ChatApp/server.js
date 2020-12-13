
require('dotenv').config()


const express =require('express');
const app=express()
const userRoutes=require('./server/routes/usercontroller')
const db=require('./server/db')
const path = require('path');

app.use(express.json())

app.use(express.static(path.join(__dirname,'www')));

app.use('/users',userRoutes)


//angular routes
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'www/index.html'))

})
app.listen(3000,()=>console.log('Server Started'))