const mongoose = require('mongoose')

const doctorSchema = new mongoose.Schema({
    userId:{
        type:String,
    },
    firstName:{
        type:String,
        required:[true,'First name is required.']
    },
    lastName:{
        type:String,
        required:[true,'Last name is required.']
    },
    phone:{
        type:String,
        required:[true,'Phone no is required.']
    },
    email:{
        type:String,
        required:[true,'Email is required.']
    },
    address:{
        type:String,
        required:[true,'Address is required.']
    },
    website:{
        type:String,
    },
    specialization:{
        type:String,
        required:[true,'Specialization is required.']
    },
    experience:{
        type:String,
        required:[true,'Experince is required.']
    },
    feesForConsultation:{
        type:Number,
        required:[true,'Fees is required.']
    },
    status:{
        type:String,
        default:'pending',
    },
    timings:{
        type:Object,
        required:[true,'Timing is required']
    }

},
{timestamps:true}
)

const doctorModel = mongoose.model('doctors',doctorSchema)
module.exports = doctorModel