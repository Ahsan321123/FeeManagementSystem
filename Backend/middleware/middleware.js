const jwt= require('jsonwebtoken')

const studentSchema=require('../model/student')

// verify token on diff routes to check authoriztion

function verifyToken ( req,res,next){
 try{   const token= req.header("x-auth-token")
    if(!token){

      return res.status(400).json({
            success:false,
            message:"not authorize"
        })
    }
    const decoded= jwt.verify(token,process.env.Jwt_Secret)
    req.staff=decoded.staff
    next()
}catch(err){
        return res.status(400).json({
            sucess:false,
            message:"token is not valid"
        })
    }

}

async function verifyCampus (req,res,next){

const student= await studentSchema.findById(req.params.id)
console.log(student)
if(!student){
    return res.status(403).json({ message: "no students found" });
}

if(student.campus !== req.staff.campus) {
    return res.status(403).json({ message: "You are not authorized to access this campus's data" });
}

next()

}


module.exports={verifyToken,verifyCampus}