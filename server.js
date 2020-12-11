
require('dotenv').config()


const express =require('express');
const app=express()
const userRoutes=require('./src/routes/usercontroller')
const db=require('./src/server/db')

app.use(express.json())
app.use('/users',userRoutes)
app.listen(3000,()=>console.log('Server Started'))