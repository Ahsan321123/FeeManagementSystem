const mongoose=require('mongoose')


const paymentSchema = new mongoose.Schema({
studentId:{
type:mongoose.Schema.Types.ObjectId,
ref:"studentSchema"
},
studentName:{
type:String,

},
GRNo:{
    type:Number,
},
className:{
    type:String,
},
status:{
    type:String,
    required:true
},
date:{
    type:Date,
    default:Date.now,
    required:true
},
bankName:{
    type: String,
    required:true
},
month:{
    type:String
},
campus:{
    type:String,
    required:true
},

});

module.exports=mongoose.model("paymentSchema",paymentSchema)