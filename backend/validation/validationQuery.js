const joi = require("joi")

module.exports = {
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).lowercase().required(),
    password: joi.string().min(5).regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/).required(),
    otp: joi.number().integer().positive().min(100000).less(999999)
}