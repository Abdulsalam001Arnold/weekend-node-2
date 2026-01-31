

import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import userRoutes from './routes/userRoutes.js'

dotenv.config()

const app = express()

mongoose.connect(process.env.MONGODB_URI)
.then(() =>{
    console.log("Connected to MongoDB")
}).catch((error) => {
    console.log(error)
})


app.use(userRoutes)
app.listen(3000, () => {
    console.log("Server running on port 3000")
})