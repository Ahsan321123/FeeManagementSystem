const { verifyCampus,verifyToken }=require( '../middleware/middleware')

const express= require('express')
const router= express.Router()
const {createStudent,createClass,getAllclasses, updateStudent, deleteStudent, studentDefaulterList}= require('../controllers/student')
const {getAllStudents,generateVoucher,updateFeeStatus, generateBatchVouchers, studentFeeReport}=require('../controllers/feeCollection')
const { createStaff,loginStaff}=require('../controllers/staff')


router.route('/students').get( verifyToken, getAllStudents).post( verifyToken,createStudent )
router.route('/student/:studentId/voucher').get( verifyToken,verifyCampus, generateVoucher)
router.route('/studentnew/:id/updateStudent').post( verifyToken,verifyCampus,updateStudent)
router.route('/student/:id/updateStatus').patch(verifyToken,verifyCampus,updateFeeStatus)
// router.route('/student/:id/voucher').post(generateFeeVoucher)
router.route('/create/class').post(createClass)
router.route('/classes').get(getAllclasses)
router.route('/student/generateBatchVouchers').post(verifyToken,verifyCampus,generateBatchVouchers)
router.route( '/student/:id/delete').get(verifyToken,verifyCampus,deleteStudent)
router.route('/student/feeReport').get(verifyToken,verifyCampus,studentFeeReport)
router.route('/student/defaulterList').get(verifyToken,verifyCampus,studentDefaulterList)
router.route('/staff/create').post(createStaff)
router.route('/staff/login').post(loginStaff)
module.exports=router;