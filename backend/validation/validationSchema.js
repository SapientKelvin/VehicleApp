const joi = require("joi")
const validate = require("../validation/validationQuery")

// For Auth User Schema
const authValidationSchema = joi.object({
    email: validate.email,
    password: validate.password
})

// For ForgotPass Schema
// Validation Schema For Enter Email Router Fields :-
const forgotPassEmailValidationSchema = joi.object({
    email: validate.email
})

// Validation Schema For Enter Email And OTP Router Fields :-
const forgotPassVerifyValidationSchema = joi.object({
    email: validate.email,
    otp: validate.otp
})

// Validation Schema For Enter Email And New Email Router Fields :-
const forgotPassResetValidationSchema = joi.object({
    email: validate.email,
    newPassword: validate.password
})

// For VehicleData Schema
// Validation Schema For Add Vehicle Router Fields :-
const vehicleDataValidationSchema = joi.object({
    modelYear: joi.number().min(1900).max(2100).required(),
    vehicleNumber: joi.string().length(10).regex(/^([A-Z]\w+[0-9]\d+)([A-Z]\w[0-9]\d)([0-9]\d+)$/).replace(/\s+/,"").uppercase().required(),
    ownerName: joi.string().min(5).replace(/\s+/g, " ").required(),
    ownerContact: joi.number().integer().positive().required(),
    ownerLicense: joi.string().length(16).replace(/\s+/," ").required(),
    vehicleType: joi.string().min(5).replace(/\s+/,"").required(),
    vehicleImgs: joi.string().min(5).required()
})

// Validation Schema For Edit Means Update Vehicle Router Fields :-
const vehicleEditDataValidationSchema = joi.object({
    ownerNameEdit: joi.string().min(5).replace(/\s+/g, " ").required(),
    ownerContactEdit: joi.number().integer().positive().required(),
    vehicleTypeEdit: joi.string().min(5).replace(/\s+/,"").required(),
    vehicleImgsEdit: joi.string().min(5).required()
})

module.exports = { authValidationSchema, forgotPassEmailValidationSchema, forgotPassVerifyValidationSchema, forgotPassResetValidationSchema, vehicleDataValidationSchema, vehicleEditDataValidationSchema}