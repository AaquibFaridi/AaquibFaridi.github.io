import React, { useState } from 'react'
import { connect } from 'react-redux'
import { forgotpwd } from 'redux/actions/auth/phoneValidate'
import { FormGroup, Form, Input, Button, Label, Col } from 'reactstrap'
import { encryptdata } from 'utility/context/SecurityTool'

import { CheckCircle, XCircle } from 'react-feather'
// import { userInfo } from "os";
const SetPassword = (props) => {
  const regex = {
    specialChars: /(?=.*?[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])/,
    digit: /[0-9]/,
    lowercase: /[a-z]/,
    uppercase: /[A-Z]/,
    noWhitespace: /^\S*$/
  }
  const ERROR_MESSAGES = {
    INVALID_INPUT: 'Invalid input',
    PASSWORD_NOT_MATCH: 'Password and confirm password did not match.',
    MAX_LENGTH: 'Password should be less than 64 characters',
    REQUIRED: 'Are Madatory fields blank?'
  }
  const [errors, setErrors] = useState(false)
  const [newPassword, setnewPassword] = useState('')
  const [confirmNewPassword, setconfirmNewPassword] = useState('')
  const [showWarning, setShowWarning] = useState(false)
  const [formErrors, setFormErrors] = useState({})

  const ValidatePwdIcon = ({ show }) => {
    return (
      <span style={{ marginRight: '5px' }}>
        {show ? (
          <CheckCircle size="15" color="green" />
        ) : (
          <XCircle size="15" color="red" />
        )}
      </span>
    )
  }
  const PasswordValidation = () => (
    <Col xs="12" sm="12" md="13" lg="13">
      <div>
        <div>
          <ValidatePwdIcon show={formErrors.minimumLength} />
          <span style={{ color: formErrors.minimumLength ? 'grey' : 'red' }}>
            Minimum 8 characters
          </span>
        </div>
        <div>
          <ValidatePwdIcon show={formErrors.uppercase} />
          <span style={{ color: formErrors.uppercase ? 'grey' : 'red' }}>
            Upper case alphabet
          </span>
        </div>
        <div>
          <ValidatePwdIcon show={formErrors.lowercase} />
          <span style={{ color: formErrors.lowercase ? 'grey' : 'red' }}>
            Lower case alphabet
          </span>
        </div>
        <div>
          <ValidatePwdIcon show={formErrors.digit} />
          <span style={{ color: formErrors.digit ? 'grey' : 'red' }}>
            Numeric
          </span>
        </div>
        <div>
          <ValidatePwdIcon show={formErrors.noWhitespace} />
          <span style={{ color: formErrors.noWhitespace ? 'grey' : 'red' }}>
            No spaces
          </span>
        </div>
        <div>
          <ValidatePwdIcon show={formErrors.specialChars} />
          <span style={{ color: formErrors.specialChars ? 'grey' : 'red' }}>
            Special character
          </span>
        </div>
      </div>
    </Col>
  )

  const errorOnConfirmNewPassword = (confirmNewPassword, errors) => {
    if (confirmNewPassword.length === 0) {
      errors.confirmNewPassword = ERROR_MESSAGES.REQUIRED
      setErrors(ERROR_MESSAGES.REQUIRED)
    } else if (newPassword !== confirmNewPassword) {
      errors.confirmNewPassword = ERROR_MESSAGES.PASSWORD_NOT_MATCH
      setErrors(ERROR_MESSAGES.PASSWORD_NOT_MATCH)
    } else {
      setErrors('')
      delete errors.confirmNewPassword
    }
  }
  const checkPwdValidations = (newPassword, errors) => {
    if (newPassword.length >= 8) {
      errors.minimumLength = true
    } else {
      delete errors.minimumLength
    }
    if (regex.specialChars.test(newPassword)) {
      errors.specialChars = true
    } else {
      delete errors.specialChars
    }
    if (regex.digit.test(newPassword)) {
      errors.digit = true
    } else {
      delete errors.digit
    }
    if (regex.lowercase.test(newPassword)) {
      errors.lowercase = true
    } else {
      delete errors.lowercase
    }
    if (regex.uppercase.test(newPassword)) {
      errors.uppercase = true
    } else {
      delete errors.uppercase
    }
    if (regex.noWhitespace.test(newPassword)) {
      errors.noWhitespace = true
    } else {
      delete errors.noWhitespace
    }
  }
  const invalidOnNewPassword = (newPassword, errors) => {
    if (!newPassword) return

    if (
      !errors.minimumLength ||
      !errors.specialChars ||
      !errors.digit ||
      !errors.lowercase ||
      !errors.uppercase ||
      !errors.noWhitespace
    ) {
      // setIsValidate(false)
      errors.newPassword = ERROR_MESSAGES.INVALID_INPUT
    } else {
      // setIsValidate(true)
      if (errors.newPassword === ERROR_MESSAGES.INVALID_INPUT) {
        delete errors.newPassword
      }
    }
  }
  const errorOnNewPassword = (newPassword, errors) => {
    if (newPassword.length > 64) {
      errors.newPassword = ERROR_MESSAGES.MAX_LENGTH
      setErrors(ERROR_MESSAGES.MAX_LENGTH)
    } else if (newPassword.length === 0) {
      errors.newPassword = ERROR_MESSAGES.REQUIRED
      setErrors(ERROR_MESSAGES.REQUIRED)
    } else {
      delete errors.newPassword
      setErrors('')
    }
  }
  const validateForm = () => {
    const errors = { ...formErrors }
    errorOnNewPassword(newPassword, errors)
    invalidOnNewPassword(newPassword, errors)
    errorOnConfirmNewPassword(confirmNewPassword, errors)
    setFormErrors(errors)
    const errObj = Object.values(errors)
    return errObj.length === 6 && errObj.every((i) => i === true)
  }
  const onHandleSubmit = (e) => {
    e.preventDefault()
    const isValid = validateForm()
    if (isValid) {
      const newP = encryptdata(props.changePass, false, newPassword)
      const body = {
        _id: props.userId,
        password: newP
      }
      props.forgotpwd(body)
    } else {
      console.log('formErrors', formErrors)
    }
  }
  const handleNewPwd = (e) => {
    e.preventDefault()
    const name = e.target?.name
    const value = e.target?.value
    const errors = { ...formErrors }
    if (name === 'newPassword') {
      setShowWarning(true)
      checkPwdValidations(value, errors)
      invalidOnNewPassword(value, errors)
    } else {
      setShowWarning(false)
    }
    name === 'newPassword'
      ? props.signup
        ? props.setpassword(value)
        : setnewPassword(value)
      : props.signup
      ? props.setconfirmPass(value)
      : setconfirmNewPassword(value)
    setFormErrors(errors)
  }
  return (
    <Form>
      <FormGroup className="form-label-group">
        <Input
          type="password"
          value={props.signup ? props.password : newPassword}
          placeholder="New Password"
          name="newPassword"
          required
          onChange={handleNewPwd}
          onBlur={handleNewPwd}
          onFocus={handleNewPwd}
        />
        <Label>New Password</Label>
      </FormGroup>
      <FormGroup className="form-label-group">
        <Input
          type="password"
          value={props.signup ? props.confirmPass : confirmNewPassword}
          name="confirmPassword"
          placeholder="Confirm Password"
          required
          onChange={handleNewPwd}
          onBlur={handleNewPwd}
          onFocus={handleNewPwd}
        />
        <Label>Confirm Password</Label>
      </FormGroup>
      {showWarning && (
        <FormGroup>
          <PasswordValidation />
        </FormGroup>
      )}
      {errors && (
        <div style={{ color: 'red', textAlign: 'center' }}>{errors}</div>
      )}

      {!props.signup && (
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
            onClick={onHandleSubmit}
          >
            Change
          </Button.Ripple>
        </div>
      )}
    </Form>
  )
}
function mapStateToProps(state) {
  const { auth } = state
  const { phoneotp } = auth
  return {
    validatedotp: phoneotp?.validatedotp?.status?.toLowerCase(), //{status:'expired'}
    validatingotp: phoneotp?.validatingotp
  }
}

export default connect(mapStateToProps, { forgotpwd })(SetPassword)
