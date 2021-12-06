/* eslint-disable no-control-regex */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import OTPscreen from 'utility/OTPscreen'
import SetPassword from './SetPassword'
import {
  validatePhoneNumber,
  validateREcoveryID
} from 'redux/actions/auth/phoneValidate'
import 'assets/scss/pages/authentication.scss'
import { CardBody, FormGroup, Form, Input, Button, Label } from 'reactstrap'
import EditSecretQues from './EditSecretQues'
import SecretQues from './SecretQues'

const ForgotPassword = (props) => {
  const {
    validatedmobile,
    backtoLogin,
    recoveringId,
    change,
    category,
    email,
    recoveryData
  } = props
  const [user, setUser] = useState(null)
  const [data, setData] = useState({
    countryCode: '91',
    Mobile: ''
  })
  const [recoveryMobile_Email, setrecoveryMobile_Email] = useState('')
  const [changePass, setChangePass] = useState(null)
  const [otpKey, setOtpKey] = useState()
  useEffect(() => {
    if (change) {
      setData({
        Email: email
      })
    }
  }, [change])
  useEffect(() => {
    validatedmobile?.key && setOtpKey(validatedmobile.key)
  }, [validatedmobile])
  useEffect(() => {
    if (recoveryData) {
      const { recoveryId, recoveryOtp } = recoveryData
      setUser(recoveryId)
      setOtpKey(recoveryOtp?.key)
    }
  }, [recoveryData])
  const changeHandler = (e) => {
    e.preventDefault()
    const value = e.target?.value
    const name = e.target?.name
    setData({
      [name]: value
    })
  }
  const validateID = (e) => {
    e.preventDefault()
    props.validateREcoveryID(data)
  }
  return (
    <CardBody className="pt-1 pb-0">
      {changePass ? (
        <SetPassword
          recoveryID={recoveryMobile_Email}
          backtoLogin={backtoLogin}
          changePass={changePass}
          userId={user._id}
        />
      ) : recoveryMobile_Email ? (
        category === 'secrets' ? (
          <EditSecretQues
            editDetails={user}
            changePass={setChangePass}
            backtoLogin={backtoLogin}
          />
        ) : (
          <SecretQues
            user={user}
            changePass={setChangePass}
            backtoLogin={backtoLogin}
          />
        )
      ) : otpKey ? (
        <OTPscreen
          userData={data}
          setUserID={setrecoveryMobile_Email}
          otpKey={otpKey}
          user={user}
        />
      ) : (
        <Form>
          <FormGroup className="form-label-group">
            <Input
              type="text"
              placeholder="email"
              name="Email"
              value={email}
              onChange={changeHandler}
              disabled={!!data['Mobile'] || email}
              required
            />
            <Label>Email</Label>
          </FormGroup>
          <div style={{ textAlign: 'center' }}>OR</div>
          <FormGroup className="form-label-group">
            <Input
              type="text"
              placeholder="Mobile"
              disabled={!!data['Email'] || email}
              name="Mobile"
              onChange={changeHandler}
              required
            />
            <Label>Mobile</Label>
          </FormGroup>
          <div className="d-flex justify-content-center">
            <Button.Ripple
              color="warning"
              outline
              className="px-75 btn-block"
              onClick={() => props.backtoLogin()}
            >
              Go Back
            </Button.Ripple>
            <Button.Ripple
              color="warning"
              type="submit"
              className="px-75 btn-block"
              disabled={recoveringId || (!data.Mobile && !data.Email)}
              onClick={validateID}
            >
              Validate
            </Button.Ripple>
          </div>
        </Form>
      )}
    </CardBody>
  )
}
function mapStateToProps(state) {
  const { auth } = state
  const { phoneotp } = auth
  return {
    recoveringId: phoneotp?.recoveringId,
    recoveryData: phoneotp?.recoveryData,
    validatedmobile: phoneotp?.validatedmobile,
    validatingmobile: phoneotp?.validatingmobile
  }
}

export default connect(mapStateToProps, {
  validatePhoneNumber,
  validateREcoveryID
})(ForgotPassword)
