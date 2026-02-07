

import Joi from "joi";


export const userValidation = Joi.object({
    username: Joi.string().min(3).max(30).allow(""),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(16).required()
})