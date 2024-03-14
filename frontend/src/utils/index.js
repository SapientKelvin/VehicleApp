const url = "http://localhost:5000"
const signInURL = `${url}/api/auth/login`
const signUpURL = `${url}/api/auth/signup`
const mailOtpURL = `${url}/api/forgot/mailotp`
const verifyOtpURL = `${url}/api/forgot/verifyotp`
const resetPasswordURL = `${url}/api/forgot/reset`

export { signInURL, signUpURL, mailOtpURL, verifyOtpURL, resetPasswordURL}