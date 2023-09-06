const studentSchema = require('../model/student')
const paymentSchema= require('../model/payment')
const classSchema= require('../model/class')

exports.createStudent = async( req,res,next )=>{
try{

    const receivedClass= req.body.class
    
const studentBody={
...req.body,
className:receivedClass,
}


    const studentData = await studentSchema.create(studentBody)

studentData.save()
res.status(200).json({
success: true,
studentData
})}
catch(err){
if(err.code === 11000){

    return  res.status(400).json({ 
        success:"false",
        message:"student with this GrNo# already exist"
     })

}
    console.log(err)
    res.status(400).json({
    message:err.message
})

}
}

exports.createClass=async(req,res,next)=>{
    try{
    
        
    const classData= await classSchema.create(req.body) 
    
    classData.save()
    res.status(200).json({
        success:true,
        classData
    })
    
    }catch(err){
    res.status(404).json({
        message:err.message
    })
    }
    
    }
    
    
    
    exports.getAllclasses=async(req,res,next)=>{
        try{
        
        const classData= await classSchema.find()  
            res.status(200).json({
            success:true,
            classData
        })
        
        }catch(err){
        res.status(404).json({
            message:err.message
        })
        }
        
        }


        exports.updateStudent=async( req,res,next )=>{
   
            try{
               const studentsId= req.params.id
              const   updatedStudent= req.body
                const student= await studentSchema.findOneAndUpdate({ _id:studentsId },
                    updatedStudent,
                    {new:true}
                    
                    )
           res.status(200).json({
            student
           })


            }
            catch(err){
                    console.log(err.message)
            }


        }

     exports.deleteStudent= async(req,res,next)=>{
        
        try{
       const  studentId= req.params.id 
    let  student= await studentSchema.findOneAndDelete({_id:studentId})
            if( !student){
                console.log("not student found")
            }

            res.status(200).json({
                success:true,
                message:"Student Deleted Successfully"
            })

        }catch(err){
                console.log(err.message)
        }


     }   

// Reports 

exports.studentDefaulterList = async (req, res, next) => {
    try {
        const students = await studentSchema.find({ status: "pending" });

        if (students.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No students found"
            });
        }

        res.status(200).json({
            success: true,
            students
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: "Error retrieving students"
        });
    }
};




// exports.studentByClass=async(req,res,next)=>{

// try{
//     let student;
 
// }catch(err){
//     res.status(400).json({
//         message:err.message
//     })
// }


// }





