const express = require("express")
const {mailOTP, verifyOTP, resetOTP} = require("../controller/forgotPass")
// For Validation
const {validateForgotEmail, validateVerifyOtp, validateResetOtp} = require("../validation/validationController/validateForgotPass")

const router = express.Router()

// Route :- 1
// Method :- POST
// URL :- http://localhost:5000/api/forgot/mailotp
// Description :- This Route Is Used For Send OTP To LoggedIn User
router.post("/mailotp", validateForgotEmail, mailOTP)

// Route :- 2
// Method :- POST
// URL :- http://localhost:5000/api/forgot/verifyotp
// Description :- This Route Is Used For Verifing The OTP And Reset Password
router.post("/verifyotp", validateVerifyOtp, verifyOTP)

// Route :- 3
// Method :- PUT
// URL :- http://localhost:5000/api/forgot/reset
// Description :- This Route Is Update User's New Password 
router.put("/reset", validateResetOtp, resetOTP)

module.exports = router