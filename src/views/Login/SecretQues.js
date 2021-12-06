/* eslint-disable no-control-regex */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { validatePhoneNumber } from 'redux/actions/auth/phoneValidate'
import { decryptdata } from 'utility/context/SecurityTool'
import 'assets/scss/pages/authentication.scss'
import { FormGroup, Form, Input, Button, Label } from 'reactstrap'
const SecretQues = (props) => {
  const { user } = props
  const [secret, setSecret] = useState({})

  const changeHandler = (e) => {
    e.preventDefault()
    const value = e.target?.value
    const name = e.target?.name
    setSecret({
      ...secret,
      [name]: value
    })
  }
  const checkSecret = (e) => {
    e.preventDefault()
    Object.keys(secret).forEach((sec) => {
      const decrypted = decryptdata(user?.secrets[sec], false, secret[sec])
      const hasMoreThanAscii = /^[\u0000-\u007f]*$/.test(decrypted)
      if (hasMoreThanAscii) {
        props.changePass(decrypted)
      }
    })
  }
  const { secrets: { secretQustion1, secretQustion2, secretQustion3 } = {} } =
    user
  return (
    <Form>
      <FormGroup className="form-label-group">
        <Input
          type="password"
          id="passwordq1"
          placeholder={secretQustion1}
          name="secretAnswer1"
          onChange={changeHandler}
        />
        <Label for="passwordq1">{secretQustion1}</Label>
      </FormGroup>
      <div style={{ textAlign: 'center' }}>OR</div>
      <FormGroup className="form-label-group">
        <Input
          type="password"
          id="passwordq2"
          placeholder={secretQustion2}
          name="secretAnswer2"
          onChange={changeHandler}
        />
        <Label for="passwordq2">{secretQustion2}</Label>
      </FormGroup>
      <div style={{ textAlign: 'center' }}>OR</div>
      <FormGroup className="form-label-group">
        <Input
          type="password"
          id="passwordq3"
          placeholder={secretQustion3}
          name="secretAnswer3"
          onChange={changeHandler}
        />
        <Label for="passwordq3">{secretQustion3}</Label>
      </FormGroup>
      <div className="d-flex justify-content-center">
        <Button.Ripple
          color="warning"
          outline
          className="px-75 btn-block"
          onClick={() => props.backtoLogin()}
        >
          Cancel
        </Button.Ripple>
        <Button.Ripple
          color="warning"
          type="submit"
          className="px-75 btn-block"
          onClick={checkSecret}
        >
          Next
        </Button.Ripple>
      </div>
    </Form>
  )
}
function mapStateToProps(state) {
  const { auth } = state
  const { phoneotp } = auth
  return {
    validatedmobile: phoneotp?.validatedmobile,
    validatingotp: phoneotp?.validatingotp
  }
}

export default connect(mapStateToProps, {
  validatePhoneNumber
})(SecretQues)
