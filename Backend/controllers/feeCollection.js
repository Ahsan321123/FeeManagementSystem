
const studentSchema= require ('../model/student')
const paymentSchema = require('../model/payment');



exports.getAllStudents = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    let query = {};
    // get filter data only from that campus
    query.campus = req.staff.campus;
    if (req.query.className) {
      query.className = req.query.className;
    }

    if (req.query.GRNo) {
      query.GRNo = req.query.GRNo;
    }

    const allStudents = await studentSchema.find(query).skip(skip).limit(limit);

    // Count students based on the applied filters
    const totalStudents = await studentSchema.countDocuments(query);

    res.status(200).json({
      success: true,
      allStudents,
      totalStudents
    });
  } catch (err) {
    res.status(400).json({
      err: err.message
    });
  }
};

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
//* Single Voucher  
  exports.generateVoucher = async  (req, res, next) => {
      try {
          const student = await studentSchema.findById(req.params.id);
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
  function getMonthName(monthIndex) {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return monthNames[monthIndex];
  }

exports.updateFeeStatus=async(req,res,next)=>{
const id= req.params.id
    try{
      const student = await studentSchema.findById(id)
      if(!student){
        res.status(400).json({
          success:false,
          message:"no student found"
        })
      }
    
 
     const existingPayment= await paymentSchema.findOne({studentId:student._id})
     if( existingPayment && existingPayment.status === "Paid"){
       return res.status(400).json({
         success:false,
         message: "already Paid"
     
       })
     }
  const paymentBody={
    ...req.body,
    campus:req.staff.campus
  }    
     const payment = await paymentSchema.create(paymentBody)
     req.staff.campus=payment.campus
 
     const currentMonth=getMonthName(new Date().getMonth())
     payment.studentId=student._id
payment.studentName=student.name;
payment.className=student.className;
payment.GRNo=student.GRNo;
payment.month=currentMonth,
student.status= payment.status;

await payment.save()
await student.save()    
    
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

      const students = await studentSchema.find({ '_id': { $in: studentIds }, 'campus': req.staff.campus });

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

exports.studentFeeReport= async(req,res,next)=>{
  try{
  
  
  const startDate =  new Date( req.query.startDate)
  const endDate= new Date(req.query.endDate) 
  if (!req.query.startDate || !req.query.endDate) {
    return res.status(400).json({ message: "Start and end dates are required." });
  }
  endDate.setHours(23, 59, 59, 999);
const payment = await paymentSchema.find({
  status:"Paid",
date:{
  $gte:startDate,
  $lte:endDate
  },
  campus:req.staff.campus
})



let groupPayments= {}
payment.forEach((p)=>{
let dateStr= p.date.toISOString().split('T')[0];
if(!groupPayments[dateStr]){
  groupPayments[dateStr]=[]
}
groupPayments[dateStr].push(p)

})



res.status(200).json({
  success:"true",
 data:payment ,
 groupPayments
})}catch(err){
 res.status(400).json({
    success:"false",
    message:err.message
   
  })
}} 

const Name="staff"





