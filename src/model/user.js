const mongoose=require('mongoose')

const userSchema= new mongoose.Schema({
 usrnm:{
     type:String,
     required:true
 },
 password:{
     type:String,
     required:true
 },
 email:{
     type:String,
     required:true
 }
})

module.exports=mongoose.model('cr_user',userSchema)