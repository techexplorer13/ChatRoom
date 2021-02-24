const mongoose=require('mongoose')
mongoose.pluralize(null);
const dataSchema= new mongoose.Schema({
 title:{
     type:String,
     required:true
 },
 shows:[{link:String,img:String}]
})

var collectionName = 'mediaGenericData'
module.exports=mongoose.model(collectionName,dataSchema)