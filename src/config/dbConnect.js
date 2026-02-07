

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

let isConnected = false

export const connectToDB = async () => {
    try {
        if(isConnected) {
            console.log("MongoDB is already connected")
            return
        }

        const db = await mongoose.connect(process.env.MONGODB_URI)

        isConnected = db.connections[0].readyState

        console.log("MongoDB connected")
    } catch (err) {
        console.log(err)
    }
}