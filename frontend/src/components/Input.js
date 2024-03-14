import React, { useState, useContext } from "react";
import Context from "../context/createContext";

function Input(props) {
  const [outlineError, setOutlineError] = useState(false)
  const {mode} = useContext(Context)
  const {lableText, type, placeholder, name, value, handleInputesChange, isRadio, check, editCheck, isNumber, min, max, fieldErrorMsg, isErrorMsg} = props;

  function handleTouched(){
    if(value.length <= 0){
      setOutlineError(true)
      setTimeout(()=>{
        setOutlineError(false)
      },1200)
    }
  }

  return (
    <>
      {isRadio ? editCheck ? (
        <div className={`${mode ? "text-gray-800" : "text-white"}`}>
          <label className="text-sm md:text-base" htmlFor={`${name}${value}`}>{lableText} </label>
          <input type={type} checked={check === value ? true : false} id={`${name}${value}`} name={name} value={value} onChange={handleInputesChange} />
        </div>
      ) : (
        <div className={`${mode ? "text-gray-800" : "text-white"}`}>
          <label className="text-sm lg:text-base font-medium" htmlFor={`${name}${value}`}>{lableText} </label>
          <input type={type} id={`${name}${value}`} name={name} value={value} onChange={handleInputesChange} />
        </div>
      ) : isNumber ? (
        <div className="flex flex-col gap-1">
          <div className={`label ${mode ? "text-gray-800" : "text-white"}`}>
            <label className="font-semibold text-base md:text-lg" htmlFor={name}>
              {lableText} {" "}
            </label>
          </div>
          <div className="inputeFields">
            <input
              className={`p-2 lg:p-2 bg-transparent w-full ${(isErrorMsg && fieldErrorMsg.length > 0) || outlineError ? "border-2 border-red-600" : "border-2"} rounded`}
              autoComplete="off"
              value={value}
              min={min}
              max={max}
              id={name}
              name={name}
              type={type}
              placeholder={placeholder}
              onChange={handleInputesChange}
            />
            {isErrorMsg && fieldErrorMsg.length > 0 ? <p className="text-red-600 font-normal">{fieldErrorMsg}</p> : null}
            {outlineError && <p className="text-red-600 font-normal">Please Enter The Valid Values</p>}
          </div>
        </div>
        ) : (
        <div className="flex flex-col gap-1">
          <div className={`label ${mode ? "text-gray-800" : "text-white"}`}>
            <label className="font-semibold text-base md:text-lg" htmlFor={name}>
              {lableText} {" "}
            </label>
          </div>
          <div className="inputeFields">
            <input
              className={`p-2 lg:p-2 bg-transparent w-full ${(isErrorMsg && fieldErrorMsg.length > 0) || outlineError ? "border-red-600" : "border-2"} rounded`}
              autoComplete="off"
              value={value}
              id={name}
              name={name}
              type={type}
              placeholder={placeholder}
              onChange={handleInputesChange}
              onBlur={handleTouched}
            />
            {isErrorMsg && fieldErrorMsg.length > 0 ? <p className="text-red-600 font-normal">{fieldErrorMsg}</p> : null}
            {outlineError && <p className="text-red-600 font-normal">Please Enter Valid {lableText}</p>}
          </div>
        </div>
      )}
    </>
  );
}

export default Input;