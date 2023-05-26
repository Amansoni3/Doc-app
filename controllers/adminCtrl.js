const userModel = require('../models/userModels')
const doctorModel = require('../models/doctorModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const getAllUserController = async (req, res) => {
  try {
    const users = await userModel.find({})
    res.status(200).send({
      success: true,
      message: "User Data",
      data: users
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      message: `Error in Admin Ctrl Get all user. ${error.message}`,
      success: false,
      error
    })
  }
}

const getAllDoctorsController = async (req, res) => {
  try {
    const doctors = await doctorModel.find({})
    res.status(200).send({
      success: true,
      message: "Doctor Data",
      data: doctors
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      message: `Error in Admin Ctrl Get all Doctor. ${error.message}`,
      success: false,
      error
    })
  }
}

const changeAccountStatusController = async (req, res) => {
  try {
    const { doctorId, status } = req.body
    const doctor = await doctorModel.findByIdAndUpdate(doctorId, { status })
    const user = await userModel.findOne({ _id: doctor.userId })
    const notification = user.notification
    notification.push({
      type: 'Doctor-account-request-accepted',
      message: `Your doctor account request has ${status}`,
      onClickPath: '/notification',
    })
    user.isDoctor = status === 'approved' ? true : false
    await user.save()
    res.status(200).send({
      success: true,
      message: "Doctor approved",
      data: doctor
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      message: `Error in change account status controller. ${error.message}`,
      success: false,
      error
    })
  }
}

module.exports = { getAllDoctorsController, getAllUserController, changeAccountStatusController }