
import { userModel } from "../models/userSchema.js"
import { userValidation } from "../validator/userValidation.js"
import bcrypt from "bcryptjs"
import { generateToken } from "../utils/generateToken.js"

export const getHome = (req, res) => {
   res.send("This is the first route")
}


export const getAbout = (req, res) => {
    res.send("This is the about route")
}

// Signup process
export const postUser = async (req, res) => {
    const {username, email, password} = req.body

    try {
        if(email !== "" && password !== "") {

            const {error} = userValidation.validate({
                username,
                email,
                password
            })

            if(error) {
                return res.status(400).json({
                    message: error.details[0].message
                })
            }

            const newUser = await userModel.create({
                username,
                email,
                password
            })

            const token = await generateToken(newUser._id)

            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development",
                sameSite: "lax",
                maxAge: 7 * 24 * 60 * 60 * 1000
            })


            return res.status(201).json({
                message: "User created successfully",
                data: newUser
            })
        }

        return res.status(400).json({
            message: "Email and password are required"
        })
       
    } catch (err) {
        console.error(err)
        throw new Error(err)
    }
}

//login process

export const loginUser = async (req, res) => {
    const {email, password} = req.body

    try {
        const {error} = userValidation.validate({
            email,
            password
        })

        if(error) {
            return res.status(400).json({
                message: error.details[0].message
            })
        }

        const existingUser = await userModel.findOne({email})

        if(!existingUser) {
            return res.status(404).json({
                message: "User not found, please signup"
            })
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password)

        if(!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid credentials"
            })
        }

        const theUser = {
            id: existingUser._id,
            username: existingUser.username,
            email: existingUser.email
        }

        return res.status(200).json({
            message: "Login successful",
            data: theUser
        })
    } catch (err) {
        console.error(err)
        throw new Error(err)
    }
}