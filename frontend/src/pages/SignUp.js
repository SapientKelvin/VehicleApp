import React,{ useState, useContext } from 'react'
import {useNavigate} from "react-router-dom"
import {Formik} from "formik"
import Context from "../context/createContext"
import { signUpSchema } from "../schemas/yupSchema"
import {signUpURL} from "../utils/index"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

function SignUp() {
    const navigate = useNavigate()
    const {mode} = useContext(Context)
    const [showPass, setShowPass] = useState(false)
    const [showConfirmPass, setShowConfirmPass] = useState(false)
    const toastOptions = {
      position:"top-center",
      autoClose:4000,
      pauseOnHover:true,
      draggable:true,
      theme:"dark"
    }

    async function handleSubmitSignUp(values, actions){
      try{
        let res = await fetch(signUpURL,{
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: values.signInEmail,
            password: values.signInPassword 
          })
        })

        let data = await res.json()

        if(data.status){
          actions.resetForm()
          toast.success("Account Create SuccessFully Now You Can Login", {...toastOptions, autoClose: 2000})
          setTimeout(()=>{
            navigate("/signin")
          },2000)
        }
        else{
          toast.error(data.message, toastOptions)
        }
      }
      catch(err){
        console.log("This Is The Error From SignUP's Catch Side :- ", err)
        toast.error("Something Went Wrong", toastOptions)
      }
    }

  return (
    <>
      <div className="container my-8 mx-auto" style={ mode ? { color: "#1F2937", background: "#E0E0E0" } : { color: "white", background: "rgb(16,24,40)" } } >
        <div className="container my-8 mx-auto" style={ mode ? { color: "#1F2937", background: "#E0E0E0" } : { color: "white", background: "rgb(16,24,40)" } } >
          <Formik initialValues={{signInEmail:"", signInPassword:"", signInConfirmPassword:""}} validationSchema={signUpSchema} onSubmit={(values, actions)=>{ handleSubmitSignUp(values, actions) }}>
            {
              ({values, touched, errors, handleBlur, handleChange, handleSubmit, isSubmitting})=>{
                return <form className={`container mx-auto max-w-fit p-1 border-[1.5px] ${ mode ? "border border-gray-800" : "border border-white glassForm" } rounded`} onSubmit={handleSubmit} >
                  <div className="inputes flex flex-col gap-4 max-w-fit p-4">

                    <div className='flex flex-col gap-1'>
                      <div className={`label ${mode ? "text-gray-800" : "text-white"}` }>
                        <label className='font-semibold text-base md:text-lg' htmlFor='signInEmail'>Email</label>
                      </div>
                      <div className="inputeFields">
                        <input type='email' className={`p-2 bg-transparent w-full md:w-96 ${touched.signInEmail && errors.signInEmail ? "border-2 border-red-800" : ""}`} id='signInEmail' name='signInEmail' placeholder='Enter Your Email' value={values.signInEmail} onChange={handleChange} onBlur={handleBlur} autoComplete='off' />
                        {touched.signInEmail && errors.signInEmail && <p className='text-red-600'>{errors.signInEmail}</p>}
                      </div>
                    </div>

                    <div className='flex flex-col gap-1'>
                      <div className={`label ${mode ? "text-gray-800" : "text-white"}` }>
                        <label className='font-semibold text-base md:text-lg' htmlFor='signInPassword'>Password</label>
                      </div>
                      <div className="inputeFields relative">
                        <input type={`${showPass ? "text" : "password"}`} className={`p-2 bg-transparent w-full md:w-96 ${touched.signInPassword && errors.signInPassword ? "border-2 border-red-800" : ""}`} id='signInPassword' name='signInPassword' placeholder='Enter Your Password' value={values.signInPassword} onChange={handleChange} onBlur={handleBlur} />
                        {showPass ? <IoMdEyeOff className={`absolute ${touched.signInPassword && errors.signInPassword ? "top-[22%] " : "top-[33%]"} right-[16px] inline`} onClick={()=>{setShowPass(!showPass)}} /> : <IoMdEye className={`absolute ${touched.signInPassword && errors.signInPassword ? "top-[22%] " : "top-[33%]"} right-[16px] inline`} onClick={()=>{setShowPass(!showPass)}} />}
                        {touched.signInPassword && errors.signInPassword && <p className='text-red-600'>{errors.signInPassword}</p>}
                      </div>
                    </div>

                    <div className='flex flex-col gap-1'>
                      <div className={`label ${mode ? "text-gray-800" : "text-white"}` }>
                        <label className='font-semibold text-base md:text-lg' htmlFor='signInConfirmPassword'>Confirm Password</label>
                      </div>
                      <div className="inputeFields relative">
                        <input type={`${showConfirmPass ? "text" : "password"}`} className={`p-2 bg-transparent w-full md:w-96 ${touched.signInConfirmPassword && errors.signInConfirmPassword ? "border-2 border-red-600" : ""}`} id='signInConfirmPassword' name='signInConfirmPassword' placeholder='Enter Confirm Password' value={values.signInConfirmPassword} onChange={handleChange} onBlur={handleBlur} />
                        {showConfirmPass ? <IoMdEyeOff className={`absolute ${touched.signInConfirmPassword && errors.signInConfirmPassword ? "top-[22%] " : "top-[33%]"} right-[16px] inline`} onClick={()=>{setShowConfirmPass(!showConfirmPass)}} /> : <IoMdEye className={`absolute ${touched.signInConfirmPassword && errors.signInConfirmPassword ? "top-[22%] " : "top-[33%]"} right-[16px] inline`} onClick={()=>{setShowConfirmPass(!showConfirmPass)}} />}
                        {touched.signInConfirmPassword && errors.signInConfirmPassword && <p className='text-red-600'>{errors.signInConfirmPassword}</p>}
                      </div>
                    </div>

                    <div className="btn my-2 flex justify-center items-center">
                      <button type='submit' disabled={isSubmitting && !errors} className={`subBtn w-full p-2 ${ mode ? "text-white bg-gray-800" : "text-gray-800 bg-white"} ${isSubmitting && !errors ? "opacity-16" : "opacity-100"} rounded-md inline-block text-lg font-semibold`} >
                        Sign Up
                      </button>
                    </div>
                  </div>
                </form>
              }
            }
          </Formik>
        </div>
      </div>
      <ToastContainer/>
    </>
  )
}

export default SignUp
