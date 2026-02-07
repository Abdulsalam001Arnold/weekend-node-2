

import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

console.log(process.env.JWT_SECRET)

export const generateToken = async (userId) => {
    const token = jwt.sign({id: userId}, process.env.JWT_SECRET, {
        expiresIn: "7d"
    })

    return token
}

