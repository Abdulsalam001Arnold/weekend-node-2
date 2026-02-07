

import express from 'express'
import dotenv from 'dotenv'
import { connectToDB } from './config/dbConnect.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

await connectToDB()


app.use(userRoutes)
app.listen(3000, () => {
    console.log("Server running on port 3000")
})