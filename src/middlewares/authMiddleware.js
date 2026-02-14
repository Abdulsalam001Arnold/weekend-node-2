
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
import { userModel } from '../models/userSchema.js'


const secret = process.env.JWT_SECRET

export const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token

    if(!token) {
        return res.status(404).json({
            message: "No token found, please signup or login"
        })
    }

    try {
        const decoded = jwt.verify(token, secret)
        req.user = await userModel.findById(decoded.id).select("-password")

        if(!req.user) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        next()
    } catch (err) {
        console.error(err)
        throw new Error(err)
    }
}