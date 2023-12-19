import React, { useRef, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import _ from 'lodash'

function TokenField ({ properties, onChange }) {
  const { t } = useTranslation()
  const tokenLength = 6
  const [otp, setOtp] = useState(new Array(tokenLength).fill(''))
  const otpBoxReference = useRef([])

  // Functions
  function handleChange (value, index) {
    let newArr = [...otp]
    newArr[index] = value
    setOtp(newArr)
    onChange(properties.id, newArr.join(''))
    if(value && index < tokenLength-1) otpBoxReference.current[index + 1].focus()
  }
  function handleBackspaceAndEnter (e, index) {
    const key = e.key
    if(key === 'Backspace' && !e.target.value && index > 0) otpBoxReference.current[index - 1].focus()
    if(key === 'Enter' && e.target.value && index < tokenLength-1) otpBoxReference.current[index + 1].focus()
  }

  return (
    <div className="py-2">
      <span className="px-1 text-sm text-gray-600">{ t(properties.label) }</span>
      <div className="flex flex-col space-y-16">
        <div className="flex flex-row items-center justify-between gap-2 mx-auto w-full max-w-xs">
        {otp.map((digit, index)=>(
          <div key={index} className="w-16 h-16">
            <input 
              type="text"
              maxLength={1}
              value={digit}
              name={`${properties.id}-field`}
              id={`${properties.id}-field`}
              onChange={(e)=> handleChange(e.target.value, index)}
              onKeyUp={(e)=> handleBackspaceAndEnter(e, index)}
              ref={(reference) => (otpBoxReference.current[index] = reference)}
              className="text-md text-center py-2 rounded-xl w-full h-full flex flex-col items-center justify-center bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none" 
            />
          </div>
        ))}
        </div>
      </div>
    </div>
  )
}

export default TokenField
