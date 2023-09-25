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
feeStatus:[{
 
    month :{
        type:String,
    required:true
    },
    year:{
        type:String,
    required:true
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
    
}],

bankName:{
    type: String,

},
campus:{
    type:String,
    required:true
},

});

module.exports=mongoose.model("paymentSchema",paymentSchema)