import * as yup from "yup"

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/g

// Creating Login Schema For Validation Using Yup NPM Package
const loginSchema = yup.object().shape({
    loginEmail: yup.string().email("Please Enter A Valid Email For Login").required("Email Is Required"),
    loginPassword: yup.string().min(5, "Passwords Must Be 5 Characters").matches(passwordRules, {message:"Please Create A Stronger Password"}).required("Password Is Required")
})

const signUpSchema = yup.object().shape({
    signInEmail: yup.string().email("Please Enter A Valid Email For SingUp").required("Email Is Required"),
    signInPassword: yup.string().min(5, "Password Must Be 5 Characters").matches(passwordRules, {message: "Please Create A Stronger Password"}).required("Password Is Required"),
    signInConfirmPassword: yup.string().oneOf( [ yup.ref("signInPassword"), null], "Password Must Be Match" ).required("Confirm Password Is Required")
})

const forgotPasswordEmailSchema = yup.object().shape({
    forgotEmail: yup.string().email("Please Enter A Valid Email For Forgot Password").required("Email Is Required")
})

const forgotPasswordOtpSchema = yup.object().shape({
    mailOTP: yup.number().lessThan(999999,"Invalid OTP").required("OTP Must Be Required")
})

const forgotPasswordResetSchema = yup.object().shape({
    newPassword: yup.string().min(5, "Password Must Be 5 Characters").matches(passwordRules, {message:"Please Create A Strong Password"}).required("New Password Is Required"),
    confirmNewPassword: yup.string().oneOf([yup.ref("newPassword"), null], "Password Must Be Match").required("Confirm New Password Is Required")
})

export { loginSchema, signUpSchema, forgotPasswordEmailSchema, forgotPasswordOtpSchema, forgotPasswordResetSchema }