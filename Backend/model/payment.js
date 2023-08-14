const mongoose=require('mongoose')


const paymentSchema = new mongoose.Schema({
studentId:{
type:mongoose.Schema.Types.ObjectId,
ref:"studentSchema"
},
status:{
    type:String,
    required:true
},
date:{
    type:Date,
    default:Date.now(),
    required:true
},
bankName:{
    type: String,
    required:true
},
});

module.exports=mongoose.model("paymentSchema",paymentSchema)