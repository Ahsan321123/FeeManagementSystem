const studentSchema = require('../model/student')
const paymentSchema= require('../model/payment')
const classSchema= require('../model/class')

exports.createStudent = async( req,res,next )=>{
try{

    const receivedClass= req.body.class
    // splitting the class and section 
    // const studentClass= receivedClass.slice(0,-1)
    // const studentSection = receivedClass.slice(-1)
    
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

    console.log(err)
    res.status(400).json({
    err:err.message
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

exports.studentDefaulterList=(req,res,next)=>{
try{
const students= studentSchema.find({status:"pending"})

if( !students){
console.log("no students found  ")
}


res.status(200).json({
    students
})
}catch(err){

}


}





// exports.studentByClass=async(req,res,next)=>{

// try{
//     let student;
 
// }catch(err){
//     res.status(400).json({
//         message:err.message
//     })
// }


// }





