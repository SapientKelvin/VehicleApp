const {forgotPassEmailValidationSchema, forgotPassVerifyValidationSchema, forgotPassResetValidationSchema} = require("../validationSchema")

// This Is Middleware For mailOTP
const validateForgotEmail = async (req,res,next)=>{
    try{
        const {error, value} =  await forgotPassEmailValidationSchema.validate(req.body)

        if(error){
            return res.status(400).json({message:error.message, status: false})
        }
        else{
            next()
        }
    }
    catch(err){
        res.status(500).json({message:"Something Went Wrong !", status: false})
    }
}

// This Is The Middleware For verifyOTP
const validateVerifyOtp = async (req,res,next)=>{
    try{
        const {error, value} = await forgotPassVerifyValidationSchema.validate(req.body)
        if(error){
            return res.status(400).json({message:error.message, status: false})
        }
        else{
            next()
        }
    }
    catch(err){
        res.status(500).json({message:"Something Went Wrong !", status: false})
    }
}

// This Is Middleware For resetOTP
const validateResetOtp = async (req,res,next)=>{
    try{
        const {error, value} = await forgotPassResetValidationSchema.validate(req.body)
        if(error){
            return res.status(400).json({message:error.message, status: false})
        }
        else{
            next()
        }
    }
    catch(err){
        res.status(500).json({message:"Something Went Wrong !", status: false})
    }
}

module.exports = {validateForgotEmail, validateVerifyOtp, validateResetOtp}