const mongoose = require('mongoose')
const colors = require('colors')

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`Mongodb connected ${mongoose.connection.host}`.bgGreen.white)
    } catch (error) {
        console.log("Error in connecting database...", error)
    }
}

module.exports = connectDb