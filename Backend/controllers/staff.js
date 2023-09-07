const staffSchema= require('../model/staff')
const bcrypt= require ('bcrypt')
const { json } = require('express')
const jwt= require('jsonwebtoken')
const staff = require('../model/staff')





exports.createStaff= async(req,res,next)=>{

try{
const {userName,password,campus }=req.body
const salt=await bcrypt.genSalt(10)
const hashPassword=  await bcrypt.hash(password,salt)
const staffData = await staffSchema.create({
 userName,
 password:hashPassword,
campus
})




res.status(200).json({

sucess: true,
message:"staff created",
staffData

})



}
catch(err){
res.status(400).json({
    sucess:false,
    message:err.message
})


}


}

exports.loginStaff= async (req,res,next)=>{

try{

const {userName,password,campus}=req.body

if(!userName || !password){

    return res.status(400).json({ message: 'provide both userName and password' });
}

const staff= await staffSchema.findOne({userName})


if(!staff){
    return res.status(400).json({ message: 'Invalid credentials' });
}
if(campus !== staff.campus){
    return res.status(400).json({ message: 'this is not your campus' });
}

let isMatch = await bcrypt.compare(password,staff.password)


if(isMatch){
const token =  jwt.sign({ staff:staff },process.env.Jwt_Secret,{expiresIn:"1h"} )
return  res.json({
    sucess:true,
    message: `${staff.userName} logged in`,
    token
})
}else{
    return res.status(400).json({ message: 'Invalid credentials' });
}


}catch(err){
    res.status(400).json({
        succes:false,
        message:err.message
    })
}

}

