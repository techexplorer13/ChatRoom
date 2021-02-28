const mongoose=require('mongoose')

const mediaShowSchema=new mongoose.Schema({
    showId:{},
    title:{},
    srchimg:{},
    link:{},
    imgsrc:{},
    about :new mongoose.Schema({
        noofseasons:{},
        genre:{}
    }),
    desctxt:{}
})

module.exports=mongoose.model('mediaShows',mediaShowSchema);