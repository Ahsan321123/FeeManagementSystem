const mongoose= require('mongoose')


const staffSchema= new mongoose.Schema({

userName:{
    type:String
},
password:{
    type:String
},
campus:{
    type:String
}

})


module.exports=mongoose.model("staffSchema",staffSchema)