import React from 'react'

function Radio(props) {
    const {lableText, type, name, value, handleInputesChange} = props
  return (
    <>
        <div className='font-semibold p-2'>
            <label htmlFor={name}>{lableText} :- </label>
            <input type={type} id={name} name={name} value={value} onChange={handleInputesChange}/>
        </div>
    </>
  )
}

export default Radio
