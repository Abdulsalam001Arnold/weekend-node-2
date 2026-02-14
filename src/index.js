

import express from 'express'
import dotenv from 'dotenv'
import { connectToDB } from './config/dbConnect.js'
import userRoutes from './routes/userRoutes.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))
app.use(cookieParser())

await connectToDB()


app.use(userRoutes)
app.listen(3000, () => {
    console.log("Server running on port 3000")
})