import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Formik } from "formik";
import Context from "../context/createContext";
import { resetPasswordURL } from "../utils";
import { forgotPasswordResetSchema } from "../schemas/yupSchema";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

function ResetPassword() {
  const navigate = useNavigate();
  const {state} = useLocation();
  const [showPass, setShowPass] = useState(false)
  const [showConfirmPass, setShowConfirmPass] = useState(false)

  const { mode } = useContext(Context);

  useEffect(()=>{
    if(!state && (state?.email === undefined)){
      navigate("/forgot")
    }
  },[])

  const toastOptions = {
    position: "top-center",
    autoClose: 2000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleResetPassword = async (values, actions)=>{    
    try{
        let res = await fetch(resetPasswordURL, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: state.email,
                newPassword: values.newPassword
            })
        })

        let data = await res.json()

        if(data.status){
            toast.success("Password Change Successfully, Now You Can Login With New Password", toastOptions)
            setTimeout(()=>{
                navigate("/signin")
            },2000)
        }
        else{
            toast.error(data.message, toastOptions)
        }
    }
    catch(err){
        console.log("This Is The Error From ResetPassword's Catch Side", err)
        toast.error("Something Went Wrong", toastOptions)
    }
  }
  return (
    <>{state?.email &&
    <div className="container my-8 mx-auto" style={ mode ? { color: "#1F2937", background: "#E0E0E0" } : { color: "white", background: "rgb(16,24,40)" } } >
      <Formik initialValues={{ newPassword: "", confirmNewPassword:""}} validationSchema={forgotPasswordResetSchema} onSubmit={(values,actions)=>{handleResetPassword(values, actions)}} >
        {({values, handleChange, handleBlur, handleSubmit, errors, touched }) => {
          return (
            <form className={`container mx-auto max-w-fit p-1 border-[1.5px] ${ mode ? "border border-gray-800" : "border border-white glassForm" } rounded`} onSubmit={handleSubmit}>
              <div className="inputes flex flex-col gap-4 max-w-fit p-4">
                  <div className="flex flex-col gap-1 pt-6">
                    <h1 className="text-2xl text-center font-semibold">Set Your New Password</h1>
                    <p className="text-sm text-center font-extralight text-gray-400">Please Enter Your New Password</p>
                  </div>

                  <div className="flex flex-col mt-2 gap-1">
                    <div className={`label ${ mode ? "text-gray-800" : "text-white" }`} >
                      <label className="font-semibold text-base md:text-lg" htmlFor="newPassword" >
                        New Password
                      </label>
                    </div>
                    <div className="inputeFields relative">
                      <input
                        type={`${showPass ? "text" : "password"}`}
                        className={`p-2 bg-transparent w-full md:w-96 ${touched.newPassword && errors.newPassword ? "border border-red-600" : ""} `}
                        id="newPassword"
                        name="newPassword"
                        placeholder="Enter Your New Password"
                        autoComplete="off"
                        value={values.newPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        />
                        {showPass ? <IoMdEyeOff className={`absolute ${touched.newPassword && errors.newPassword ? "top-[22%] " : "top-[33%]"} right-[16px] inline`} onClick={()=>{setShowPass(!showPass)}} /> : <IoMdEye className={`absolute ${touched.newPassword && errors.newPassword ? "top-[22%] " : "top-[33%]"} right-[16px] inline`} onClick={()=>{setShowPass(!showPass)}} />}
                        {touched.newPassword && errors.newPassword && (<p className={`${touched.newPassword && errors.newPassword ? "text-red-600" : ""}`}>{errors.newPassword}</p>)}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <div className={`label ${ mode ? "text-gray-800" : "text-white" }`} >
                      <label className="font-semibold text-base md:text-lg" htmlFor="confirmNewPassword" >
                        Confirm New Password
                      </label>
                    </div>
                    <div className="inputeFields relative">
                      <input
                        type={`${showConfirmPass ? "text" : "password"}`}
                        className={`p-2 bg-transparent w-full md:w-96 ${touched.confirmNewPassword && errors.confirmNewPassword ? "border border-red-600" : ""} `}
                        id="confirmNewPassword"
                        name="confirmNewPassword"
                        placeholder="Enter Your Confirm New Password"
                        autoComplete="off"
                        value={values.confirmNewPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        />
                        {showConfirmPass ? <IoMdEyeOff className={`absolute ${touched.confirmNewPassword && errors.confirmNewPassword ? "top-[22%] " : "top-[33%]"} right-[16px] inline`} onClick={()=>{setShowConfirmPass(!showConfirmPass)}} /> : <IoMdEye className={`absolute ${touched.confirmNewPassword && errors.confirmNewPassword ? "top-[22%] " : "top-[33%]"} right-[16px] inline`} onClick={()=>{setShowConfirmPass(!showConfirmPass)}} />}
                        {touched.confirmNewPassword && errors.confirmNewPassword && (<p className={`${touched.confirmNewPassword && errors.confirmNewPassword ? "text-red-600" : ""}`}>{errors.confirmNewPassword}</p>)}
                    </div>
                  </div>

                <div className="btn my-2 flex justify-center items-center">
                  <button type="submit" className={`subBtn w-full md:w-96 p-2 ${ mode ? "text-white bg-gray-800" : "text-white bg-blue-800" } rounded-md inline-block text-lg font-semibold`}>
                    Update Password
                  </button>
                </div>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>}
    <ToastContainer />
  </>
  );
}

export default ResetPassword;
