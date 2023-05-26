const express = require('express')
const authMiddleWare = require('../middlewares/authMiddleWare')
const { getDoctorInfoController, updateProfileController, getDoctorByIdController } = require('../controllers/doctorCtrl')

const router = express.Router()

//Post single doctor information
router.post('/getDoctorInfo', authMiddleWare, getDoctorInfoController)

// Post Update single doctor infprmation
router.post('/updateDoctorInfo',authMiddleWare,updateProfileController)

//Post get single doc info
router.post('/getDoctorById',authMiddleWare,getDoctorByIdController)

module.exports = router