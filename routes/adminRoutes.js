const express = require('express')
const authMiddleWare = require('../middlewares/authMiddleWare')
const { getAllUserController, getAllDoctorsController, changeAccountStatusController } = require('../controllers/adminCtrl')

// router object
const router = express.Router()

// GET METHOD || USERS
router.get('/getAllUser' , authMiddleWare , getAllUserController)
// GET METHOD || ALL DOCTORS
router.get('/getAllDoctors',authMiddleWare,getAllDoctorsController)
// Post method || change status
router.post('/changeAccountStatus',authMiddleWare,changeAccountStatusController)






module.exports = router