
const studentSchema= require ('../model/student')
const paymentSchema = require('../model/payment');

const PDFDocument = require('pdfkit');

exports.getAllStudents=async(req,res,next)=>{
  try{
const allStudents= await studentSchema.find()


if(req.query.className){
    student = await studentSchema.find({className:req.query.className}) 

   return  res.status(200).json({
        success:true,
        student
        })
}

if(req.query.GRNo){
    student = await studentSchema.find({GRNo:req.query.GRNo}) 

   return  res.status(200).json({
        success:true,
        student
        })
}


 res.status(200).json({
      success: true,
      allStudents
      })
  }
  catch(err){
  res.status(400).json({
          err:err.message
          })   }
  
  }
   
  exports.generateVoucher = async (req, res, next) => {
      try {
          const student = await studentSchema.findById(req.params.studentId);
          const payment = await paymentSchema.findOne({ studentId: req.params.studentId });
  
          if (!payment || !student) {
              return res.status(404).send('Payment or Student not found');
          }
  
          const doc = new PDFDocument;
          res.setHeader('Content-Type', 'application/pdf');
          res.setHeader('Content-Disposition', 'inline; filename=paymentVoucher.pdf');

          doc.pipe(res);
  
          doc.fontSize(25).text('Payment Voucher', 50, 50);
          doc.fontSize(16).text(`Student Name: ${student.name}`, 50, 100);
          doc.fontSize(16).text(`Fee: ${student.fee}`, 50, 150);
          doc.fontSize(16).text(`Payment Status: ${payment.status}`, 50, 200);
          doc.fontSize(16).text(`Date: ${payment.date}`, 50, 250);
  
          doc.end();
      } catch(err) {
          next(err);
      }
  };

exports.updateFeeStatus=async(req,res,nexy)=>{
const id= req.params.id
    try{
const payment = await paymentSchema.create(req.body)
await payment.save()
    const student = await studentSchema.findById(id)
    if(student){
    student.status= payment.status
    await student.save()
} 


res.status(200).json({
  message:"payment status updated successfully",
  payment,
  student
})
}catch(err){
console.log(err)
}



}








