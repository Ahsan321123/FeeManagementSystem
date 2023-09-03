const mongoose= require("mongoose")


const studentSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true,"please enter stundent name"]
    }
,
    className:{
    type:String,
    required:[true,"please enter class  "]
    },
    fee:{
        type:Number,
        required:[true,"please enter fee "]
    },
    status:{
    type:String,
    default:"pending"
    },
    GRNo:{
        type:String,
        required:true
    },
    DOB:{
        type:Date,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    phoneNo:{
        type:Number,
        required:true
    },
    dateOfAdmission:{
        type:Date,
        required:true
    },
    fatherName:{
        type:String,
        required:true
    },
    CNIC:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },

}
)

module.exports= mongoose.model('studentSchema',studentSchema)

