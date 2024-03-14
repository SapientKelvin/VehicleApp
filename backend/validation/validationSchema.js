const joi = require("joi")
const validate = require("../validation/validationQuery")

const authValidationSchema = joi.object({
    email: validate.email,
    password: joi.string().min(5).regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/).required()
})

const forgotPassEmailValidationSchema = joi.object({
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).lowercase().required()
})

const forgotPassVerifyValidationSchema = joi.object({
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).lowercase().required(),
    otp: joi.number().integer().positive().min(100000).less(999999)
})

const forgotPassResetValidationSchema = joi.object({
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).lowercase().required(),
    newPassword: joi.string().min(5).regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/).required()
})

module.exports = { authValidationSchema, forgotPassEmailValidationSchema, forgotPassVerifyValidationSchema, forgotPassResetValidationSchema}