
require('dotenv').config()


const express =require('express');
const app=express()
const userRoutes=require('./server/routes/usercontroller')
const db=require('./server/db')
const path = require('path');
const cors = require('cors')
app.use(cors())

app.use(express.json())

app.use('/users',userRoutes)

app.listen(3000,()=>console.log('Server Started'))