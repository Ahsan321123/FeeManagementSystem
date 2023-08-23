const express= require('express')
const router= express.Router()
const {createStudent,createClass,getAllclasses, updateStudent}= require('../controllers/student')
const {getAllStudents,generateVoucher,updateFeeStatus, generateBatchVouchers}=require('../controllers/feeCollection')


router.route('/students').get( getAllStudents)
router.route( '/student/create').post(createStudent )
router.route('/student/:studentId/voucher').get(generateVoucher)
router.route('/studentnew/:id/updateStudent').post(updateStudent)
router.route('/student/:id/updateStatus').post(updateFeeStatus)
// router.route('/student/:id/voucher').post(generateFeeVoucher)
router.route('/create/class').post(createClass)
router.route('/classes').get(getAllclasses)
router.route('/student/generateBatchVouchers').post(generateBatchVouchers)


module.exports=router;