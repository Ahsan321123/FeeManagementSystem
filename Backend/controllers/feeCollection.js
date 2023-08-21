
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
   
  // **** Generate Voucher for Specifice student logic 

  let nowInPakistan = new Date(new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Karachi',
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit'
  }).format(new Date()));

  const schoolName= "Green Peace Schoo"
  const Bank= "Habib Metro"

  let lateFee= 500
const calculateFee=async(student )=>{

let currentDate= nowInPakistan
let currentDay= currentDate.getDate()
let dueDate= new Date (currentDate.getFullYear(),currentDate.getMonth(),10 )
let lateFeeApplied= currentDay> 10 ? lateFee: 0 
let totalFee=  student.fee +( lateFeeApplied ? lateFee : 0)
let dueDateString = dueDate.toLocaleDateString()
return{
    schoolName: schoolName,
    schoolBank: Bank,
    studentName: student.name,
    className: student.className,
     baseFee: student.fee,
    lateFee: lateFeeApplied ? lateFee : 0,
    totalFee: totalFee,
    dueDate: dueDateString,
    currentDate: currentDate
}


}

  exports.generateVoucher = async  (req, res, next) => {
      try {
          const student = await studentSchema.findById(req.params.studentId);
        //  const {data}=req.body.data 
        
        if(!student){
            console.log("no student Found")
        }
const voucherDetails=await calculateFee(student)
   

        res.status(200).json( voucherDetails)
       
        
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


   
  // **** Generate Vouchers of All Students  by class 

exports.generateBatchVouchers = async (req, res, next) => {
  try {
      const studentIds = req.body.StudentIds;
      
      if(!Array.isArray(studentIds) || studentIds.length === 0) {
          return res.status(400).json({ error: 'Invalid studentIds' });
      }

      const students = await studentSchema.find({ '_id': { $in: studentIds } });

      if(students.length === 0) {
          return res.status(404).json({ error: 'No students found' });
      }

      const vouchers = await Promise.all(students.map(async student => {
          return calculateFee(student);
      }));

      res.status(200).json({vouchers,students});
  } catch(err) {
      next(err);
  }
};








// VoucherFromBackend 
     //   const doc = new PDFDocument;
        //   res.setHeader('Content-Type', 'application/pdf');
        //   res.setHeader('Content-Disposition', 'inline; filename=paymentVoucher.pdf');

        //   doc.pipe(res);
  
        //   doc.fontSize(25).text('Payment Voucher', 50, 50);
        //   doc.fontSize(16).text(`Student Name: ${student.name}`, 50, 100);
        //   doc.fontSize(16).text(`Fee: ${student.fee}`, 50, 150);
        //   doc.fontSize(16).text(`Payment Status: ${payment.status}`, 50, 200);
        //   doc.fontSize(16).text(`Date: ${payment.date}`, 50, 250);
  
        //   doc.end();