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
        required:true,
        unique:true,
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
        type:String,
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
        required:true,
        maxlength: [13, "CNIC Number should be 13 digits"]
    },
    address:{
        type:String,
        required:true
    },

}
)

module.exports= mongoose.model('studentSchema',studentSchema)

