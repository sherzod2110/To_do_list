import Joi from "joi"

export const todoValidate = Joi.object({
    text: Joi.string()
})