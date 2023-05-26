const express = require('express')
const colors = require('colors')
const morgan = require('morgan')
const dotenv = require('dotenv')
const connectDb = require('./config/db')

//dotenv
dotenv.config()

// mongodb connection
connectDb()

// rest object

const app = express()

// middlewares

app.use(express.json())
app.use(morgan('dev'))

//routes

app.use('/api/v1/user',require("./routes/userRoutes"))

app.use('/api/v1/admin',require("./routes/adminRoutes"))

app.use('/api/v1/doctor',require("./routes/doctorRoutes"))

// port 
const port = process.env.PORT || 8080

// listen port

app.listen(port, () => {
    console.log(`Server is running on ${process.env.NODE_MODE} mode on port ${process.env.PORT}`.bgCyan.white)
})

// command to run npm run server
