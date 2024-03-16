import React, { useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import Context from "../context/createContext";
import {mailOtpURL} from "../utils"
import {forgotPasswordEmailSchema} from "../schemas/yupSchema"
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function ForgotPassword() {
  const navigate = useNavigate();

  const { mode } = useContext(Context);

  const toastOptions = {
    position:"top-center",
    autoClose:4000,
    pauseOnHover:true,
    draggable:true,
    theme:"dark"
  }

  useEffect(()=>{
    if(JSON.parse(localStorage.getItem("authToken"))){
      navigate("/")
    }
  },[])

  const handleForgotPassword = async (values, actions)=>{
    try{
      let res = await fetch(mailOtpURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: values.forgotEmail
        })
      })

      let data = await res.json()

      if(data.status){
        toast.success(`OTP Has Been Sended On This Mail ${data.data.email}`)
        navigate("/verifyotp", {state: {email:values.forgotEmail}})
      }
      else{
        toast.error(data.message, toastOptions)
      }
    }
    catch(err){
      console.log("This Is Error From ForgotPassword Catch Side :- ", err)
      toast.error("Something Went Wrong", toastOptions)
    }
  }

  return (
    <>
      <div className="container my-8 mx-auto" style={ mode ? { color: "#1F2937", background: "#E0E0E0" } : { color: "white", background: "rgb(16,24,40)" } } >
        <Formik initialValues={{forgotEmail:""}} validationSchema={forgotPasswordEmailSchema} onSubmit={(values, actions)=>{handleForgotPassword(values, actions)}} >
          {({values, handleChange, handleBlur, handleSubmit, errors, touched, isSubmitting}) => {
            return (
              <form className={`container mx-auto max-w-fit p-1 border-[1.5px] ${ mode ? "border border-gray-800" : "border border-white glassForm" } rounded`} onSubmit={handleSubmit}>
                <div className="inputes flex flex-col gap-4 max-w-fit p-4">
                    <div className="flex flex-col gap-1 pt-6">
                      <h1 className="text-2xl text-center font-semibold">Forgot Password</h1>
                      <p className="text-sm text-center font-extralight text-gray-400">Please Enter Your Email Address To Recive An OTP</p>
                    </div>
                    <div className="flex flex-col mt-2 gap-1">
                      <div className="inputeFields">
                        <input
                          type="email"
                          className={`p-2 bg-transparent w-full md:w-96 ${touched.forgotEmail && errors.forgotEmail ? "border border-red-600" : ""} `}
                          id="forgotEmail"
                          name="forgotEmail"
                          placeholder="Enter Your Email"
                          autoComplete="off"
                          value={values.forgotEmail}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          />
                          {touched.forgotEmail && errors.forgotEmail && (<p className={`${touched.forgotEmail && errors.forgotEmail ? "text-red-600" : ""}`}>{errors.forgotEmail}</p>)}
                      </div>
                    </div>
                    <div className="btn mt-4 flex justify-center items-center">
                      <button type="submit" className={`subBtn w-full md:w-96 p-2 ${ mode ? "text-white bg-gray-800" : "text-white bg-blue-800" } rounded-md inline-block text-lg text-center font-semibold`}>
                        {isSubmitting ? "Sending OTP ...." : "Submit Email"}
                      </button>
                    </div>
                    <div className="my-1 flex justify-center items-center">
                      <p className="text-center">Back To <span><Link className="text-blue-600 font-semibold" to={"/signin"}> Sign in</Link> </span> </p>
                    </div>
                </div>
              </form>
            );
          }}
        </Formik>
      </div>
      <ToastContainer />
    </>
  );
}

export default ForgotPassword;