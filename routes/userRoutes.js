const express = require('express')
const { loginController, registerController, authController, applyDoctorController, getAllNotificationController, deleteAllNotificationController, getAllDoctorController } = require('../controllers/userCtrl')
const authMiddleWare = require('../middlewares/authMiddleWare')

// router object
const router = express.Router()

//routes

//Login
router.post('/login',loginController)
//Register
router.post('/register',registerController)

//Auth || Post
router.post('/getUserData', authMiddleWare , authController)

// Apply for doctor 
router.post('/applydoctor', authMiddleWare , applyDoctorController)
// Notification 
router.post('/get-all-notification', authMiddleWare , getAllNotificationController)

router.post('/delete-all-notification', authMiddleWare , deleteAllNotificationController)

// get all doctor controller

router.get('/getAllDoctor',authMiddleWare,getAllDoctorController)














module.exports = router