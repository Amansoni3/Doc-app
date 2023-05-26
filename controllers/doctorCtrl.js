const userModel = require('../models/userModels')
const doctorModel = require('../models/doctorModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const getDoctorInfoController = async (req, res) => {
    try {
        const doctor = await doctorModel.findOne({ userId: req.body.userId })
        res.status(200).send({
            success: true,
            message: "Doctor info fetched succesfully",
            data: doctor
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: `Error in get doctor info controller. ${error.message}`,
            success: false,
            error
        })
    }
}
const updateProfileController = async (req, res) => {
    try {
        const doctor = await doctorModel.findOneAndUpdate({ userId: req.body.userId },req.body)
        res.status(201).send({
            success: true,
            message: "Doctor Profile Updated succesfully",
            data: doctor
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: `Error in update doctor info controller. ${error.message}`,
            success: false,
            error
        })
    }
}

const getDoctorByIdController = async (req, res) => {
    try {
        const doctor = await doctorModel.findOne({_id: req.body.doctorId })
        res.status(200).send({
            success: true,
            message: "Operation succesfully",
            data: doctor
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: `Error in get doctor by id controller. ${error.message}`,
            success: false,
            error
        })
    }
}



module.exports = { getDoctorInfoController,updateProfileController,getDoctorByIdController }