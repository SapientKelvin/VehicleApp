import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import Context from "../context/createContext";
import { loginSchema } from "../schemas/yupSchema";
import {signInURL} from "../utils/index"
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

function SignIn() {
  const navigate = useNavigate();
  const { mode } = useContext(Context);
  const [showPass, setShowPass] = useState(false)

  const toastOptions = {
    position:"top-center",
    autoClose:4000,
    pauseOnHover:true,
    draggable:true,
    theme:"dark"
  }

  const handleSubmitLogin = async (values, actions) => {
    try{
      let res = await fetch(signInURL,{
        method: "POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          email: values.loginEmail,
          password: values.loginPassword
        })
      })

      let data = await res.json()

      if(data.status){
        actions.resetForm()
        localStorage.setItem("authToken", JSON.stringify(data.authToken))
        navigate("/")
      }
      else{
        toast.error(data.message, toastOptions)
      }
    }
    catch(err){
      toast.error("Something Went Wrong", toastOptions)
      console.log("This Is A Error From SignIn Form Catch Side", err)
    }
  };

  return (
    <>
      <div
        className="container my-8 mx-auto"
        style={
          mode
            ? { color: "#1F2937", background: "#E0E0E0" }
            : { color: "white", background: "rgb(16,24,40)" }
        }
      >
        <Formik
          initialValues={{ loginEmail: "", loginPassword: "" }}
          validationSchema={loginSchema}
          onSubmit={(values, actions)=>{handleSubmitLogin(values, actions)}}
        >
          {({ values, handleChange, handleBlur, handleSubmit, touched, errors, isSubmitting }) => {
            return (
              <form
                onSubmit={handleSubmit}
                className={`container mx-auto max-w-fit p-1 border-[1.5px] ${
                  mode ? "border border-gray-800" : "border border-white glassForm"
                } rounded`}
              >
                <div className="inputes flex flex-col gap-4 max-w-fit p-4">
                  <div className="flex flex-col gap-1">
                    <div
                      className={`label ${
                        mode ? "text-gray-800" : "text-white"
                      }`}
                    >
                      <label
                        className="font-semibold text-base md:text-lg"
                        htmlFor="loginEmail"
                      >
                        Email
                      </label>
                    </div>
                    <div className="inputeFields">
                      <input
                        type="email"
                        className={`p-2 bg-transparent w-full md:w-96 ${
                          touched.loginEmail && errors.loginEmail
                            ? "border-2 border-red-800"
                            : ""
                        }`}
                        id="loginEmail"
                        name="loginEmail"
                        placeholder="Enter Your Email"
                        value={values.loginEmail}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete="off"
                      />
                      {touched.loginEmail && errors.loginEmail && (
                        <p className="text-red-600">{errors.loginEmail}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div
                      className={`label ${
                        mode ? "text-gray-800" : "text-white"
                      }`}
                    >
                      <label
                        className="font-semibold text-base md:text-lg"
                        htmlFor="loginPassword"
                      >
                        Password
                      </label>
                    </div>
                    <div className="inputeFields relative">
                      <input
                        type={`${showPass ? "text" : "password"}`}
                        className={`p-2 bg-transparent w-full md:w-96 ${
                          touched.loginPassword && errors.loginPassword
                            ? "border-2 border-red-800"
                            : ""
                        }`}
                        id="loginPassword"
                        name="loginPassword"
                        placeholder="Enter Your Password"
                        value={values.loginPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {showPass ? <IoMdEyeOff className={`absolute ${touched.loginPassword && errors.loginPassword ? "top-[22%] " : "top-[33%]"} right-[16px] inline`} onClick={()=>{setShowPass(!showPass)}} /> : <IoMdEye className={`absolute ${touched.loginPassword && errors.loginPassword ? "top-[22%] " : "top-[33%]"} right-[16px] inline`} onClick={()=>{setShowPass(!showPass)}} />}
                      {touched.loginPassword && errors.loginPassword && (
                        <p className="text-red-600">{errors.loginPassword}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Link className="text-blue-600 font-semibold" to={"/forgot"}>
                      Forgot password ?
                    </Link>
                  </div>

                  <div className="btn my-2 flex justify-center items-center">
                    <button
                      type="submit"
                      disabled={isSubmitting && !errors}
                      className={`subBtn w-full p-2 ${
                        mode
                          ? "text-white bg-gray-800"
                          : "text-gray-800 bg-white"
                      } ${
                        isSubmitting && !errors ? "opacity-16" : "opacity-100"
                      } rounded-md inline-block text-lg font-semibold`}
                    >
                      Log In
                    </button>
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

export default SignIn;
