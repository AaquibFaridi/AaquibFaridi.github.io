import React, { useState, useEffect } from 'react'
import MobileEntry from './MobileEntry'
import OTPscreen from 'utility/OTPscreen'
import { connect, useDispatch } from 'react-redux'
const MobileInputLogin = (props) => {
  const {
    setmobile,
    validatedotp,
    validatedmobile,
    validatingmobile,
    validateOTP,
    resendOTP
  } = props

  const dispatch = useDispatch()
  const [message, setMessage] = useState()
  const [otpKey, setOtpKey] = useState()
  const [mobileData, setMobileData] = useState({
    countryCode: '91',
    phone: ''
  })

  useEffect(() => {
    if (validatingmobile) return
    if (typeof validatedmobile === 'object')
      validatedmobile?.key && setOtpKey(validatedmobile.key)
    if (typeof validatedmobile === 'string') setMessage(validatedmobile)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validatedmobile, validatingmobile])
  useEffect(() => {
    return () => dispatch({ type: 'RESET_OTP' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      {validatedmobile && otpKey ? (
        <OTPscreen
          userData={mobileData}
          setUserID={setmobile}
          validatedotp={validatedotp}
          validateOTP={validateOTP}
          resendOTP={resendOTP}
          otpKey={otpKey}
        />
      ) : (
        <MobileEntry
          setMobileData={setMobileData}
          mobileData={mobileData}
          setMessage={setMessage}
          message={message}
        />
      )}
    </div>
  )
}
function mapStateToProps(state) {
  const { auth } = state
  const { phoneotp } = auth
  return {
    invalidmobile: phoneotp?.invalidmobile,
    validatedmobile: phoneotp?.validatedmobile,
    validatingmobile: phoneotp?.validatingmobile
  }
}
export default connect(mapStateToProps)(MobileInputLogin)
