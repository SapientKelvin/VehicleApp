import React, { useEffect, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Formik } from "formik";
import Context from "../context/createContext";
import { verifyOtpURL } from "../utils";
import { forgotPasswordOtpSchema } from "../schemas/yupSchema";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Verify() {
  const navigate = useNavigate();
  const {state} = useLocation()

  const { mode } = useContext(Context);

  useEffect(()=>{
    console.log("Effect From VerifyOTP")
    if(!state && (state?.email === undefined)){
      navigate("/forgot")
    }
  },[])

  const toastOptions = {
    position: "top-center",
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleVerifyOtp = async (values, actions)=>{
    try{
        let res = await fetch(verifyOtpURL, {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: state.email,
                otp: values.mailOTP
            })
        })

        let data = await res.json()

        if(data.status){
            toast.success(data.data, toastOptions)
            navigate("/resetpassword", {state: {email:state.email}})
        }
        else{
            toast.error(data.message, toastOptions)
        }
    }
    catch(err){
        console.log("This Is The Error From Verify's Catch Side", err)
        toast.error("Something Went Wrong", toastOptions)
    }
  }

  return (
    <>{state?.email && 
    <div className="container my-8 mx-auto" style={ mode ? { color: "#1F2937", background: "#E0E0E0" } : { color: "white", background: "rgb(16,24,40)" } } >
      <Formik initialValues={{ mailOTP: ""}} validationSchema={forgotPasswordOtpSchema} onSubmit={(values,actions)=>{handleVerifyOtp(values, actions)}} >
        {({values, handleChange, handleBlur, handleSubmit, errors, touched }) => {
          return (
            <form className={`container mx-auto max-w-fit p-1 border-[1.5px] ${ mode ? "border border-gray-800" : "border border-white glassForm" } rounded`} onSubmit={handleSubmit}>
              <div className="inputes flex flex-col gap-4 max-w-fit p-4">
                  <div className="flex flex-col gap-1 pt-6">
                    <h1 className="text-2xl text-center font-semibold">Check Your Email</h1>
                    <p className="text-sm text-center font-extralight text-gray-400">We Have Sent A Password Recovery OTP To Your Email</p>
                    <p className="text-sm text-center font-semibold text-gray-400">{state.email}</p>
                  </div>

                  <div className="flex flex-col mt-2 gap-1">
                    <div className="inputeFields">
                      <input
                        type="number"
                        className={`p-2 bg-transparent w-full md:w-96 ${touched.mailOTP && errors.mailOTP ? "border border-red-600" : ""} `}
                        id="mailOTP"
                        name="mailOTP"
                        placeholder="OTP"
                        autoComplete="off"
                        value={values.mailOTP}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        />
                        {touched.mailOTP && errors.mailOTP && (<p className={`${touched.mailOTP && errors.mailOTP ? "text-red-600" : ""}`}>{errors.mailOTP}</p>)}
                    </div>
                  </div>

                <div className="btn mt-4 flex justify-center items-center">
                  <button type="submit" className={`subBtn w-full md:w-96 p-2 ${ mode ? "text-white bg-gray-800" : "text-white bg-blue-800" } rounded-md inline-block text-lg font-semibold`}>
                    Submit OTP
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
    </div>}
    <ToastContainer />
  </>
  );
}

export default Verify;
