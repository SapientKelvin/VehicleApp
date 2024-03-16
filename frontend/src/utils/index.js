// From Main Server URL Accessing Using cors
const url = "http://localhost:5000"

// From Server SignUp And Login (SignIn) URL
const signInURL = `${url}/api/auth/login`
const signUpURL = `${url}/api/auth/signup`

// From Server Forgot Password And OTP And Reset New Password URL
const mailOtpURL = `${url}/api/forgot/mailotp`
const verifyOtpURL = `${url}/api/forgot/verifyotp`
const resetPasswordURL = `${url}/api/forgot/reset`

// From Server All The Vehicle Data URL 
const getAllVehicleDataURL= `${url}/api/data/getallvehicle`
const addVehicleDataURL = `${url}/api/data/addvehicle`
const updateVehicleDataURL = `${url}/api/data/updatevehicle`
const removeVehicleDataURL = `${url}/api/data/removevehicle`
const getSingleVehicleDataURL = `${url}/api/data/singlevehicle`

export { signInURL, signUpURL, mailOtpURL, verifyOtpURL, resetPasswordURL, getAllVehicleDataURL, addVehicleDataURL, updateVehicleDataURL, removeVehicleDataURL, getSingleVehicleDataURL}