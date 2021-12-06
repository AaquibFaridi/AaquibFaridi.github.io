import React, { useState } from 'react'
import countryCodes from './country_codes'
import ReactCountryFlag from 'react-country-flag'
import { validatePhoneNumber } from 'redux/actions/auth/phoneValidate'
import { connect } from 'react-redux'
import themeConfig from 'configs/themeConfig'
import { FormGroup, Input, Col, Row, Button, Label } from 'reactstrap'
import handleKeyMobileNumber from 'utility/context/InputTypeNum'
import Select from 'react-select'
const MobileEntry = (props) => {
  const {
    validatePhoneNumber,
    validatingmobile,
    mobileData,
    setMobileData,
    message,
    setMessage
  } = props
  const [selectedItem, setSelectedItem] = useState({
    countryCode: '91',
    id: 'IN',
    flag: '🇮🇳',
    mobileNumberRegex:
      '(?:61279|7(?:887[02-9]|9(?:313|79[07-9]))|8(?:079[04-9]|(?:84|91)7[02-8]))\\d{5}|(?:6(?:12|[2-47]1|5[17]|6[13]|80)[0189]|7(?:1(?:2[0189]|9[0-5])|2(?:[14][017-9]|8[0-59])|3(?:2[5-8]|[34][017-9]|9[016-9])|4(?:1[015-9]|[29][89]|39|8[389])|5(?:[15][017-9]|2[04-9]|9[7-9])|6(?:0[0-47]|1[0-257-9]|2[0-4]|3[19]|5[4589])|70[0289]|88[089]|97[02-8])|8(?:0(?:6[67]|7[02-8])|70[017-9]|84[01489]|91[0-289]))\\d{6}|(?:7(?:31|4[47])|8(?:16|2[014]|3[126]|6[136]|7[78]|83))(?:[0189]\\d|7[02-8])\\d{5}|(?:6(?:[09]\\d|1[04679]|2[03689]|3[05-9]|4[0489]|50|6[069]|7[07]|8[7-9])|7(?:0\\d|2[0235-79]|3[05-8]|40|5[0346-8]|6[6-9]|7[1-9]|8[0-79]|9[089])|8(?:0[01589]|1[0-57-9]|2[235-9]|3[03-57-9]|[45]\\d|6[02457-9]|7[1-69]|8[0-25-9]|9[02-9])|9\\d\\d)\\d{7}|(?:6(?:(?:1[1358]|2[2457]|3[2-4]|4[235-7]|5[2-689]|6[24578]|8[124-6])\\d|7(?:[235689]\\d|4[0189]))|7(?:1(?:[013-8]\\d|9[6-9])|28[6-8]|3(?:2[0-49]|9[2-5])|4(?:1[2-4]|[29][0-7]|3[0-8]|[56]\\d|8[0-24-7])|5(?:2[1-3]|9[0-6])|6(?:0[5689]|2[5-9]|3[02-8]|4\\d|5[0-367])|70[13-7]|881))[0189]\\d{5}',
    name: 'India',
    label: 'India',
    value: 'India'
  })
  const [numberError, setNumberError] = useState('')

  function changeHandler(e) {
    const phoneNumber = e.target?.value
    !phoneNumber && setNumberError('')
    setMessage('')
    setMobileData({
      ...mobileData,
      phone: phoneNumber
    })
  }
  function validateMobileNumberByRegex() {
    const val = mobileData.phone
    const selectedCountry = countryCodes.find(
      (item) => `${item.name}` === selectedItem.name
    )
    if (
      selectedCountry &&
      !new RegExp(
        `^(${selectedCountry.mobileNumberRegex})$`.split('\\\\').join('\\')
      ).test(val)
    ) {
      setNumberError('Invalid mobile number')
    } else {
      validatePhoneNumber(mobileData)
      numberError && setNumberError('')
    }
  }
  function onHandleSubmit() {
    validateMobileNumberByRegex()
  }
  const customOptions = ({ label, id, countryCode }) => {
    return (
      <div className="d-flex">
        <ReactCountryFlag
          style={{
            width: '36px',
            height: '20px'
          }}
          countryCode={id}
          svg
        />
        <div
          style={{
            marginLeft: '5px',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap'
          }}
        >
          {label}
        </div>
        <div className="std_code">( +{countryCode} )</div>
      </div>
    )
  }
  return (
    <>
      <Row>
        <Col lg="12" md="12" sm="12">
          {message && (
            <div
              style={{
                color: 'red',
                textAlign: 'center',
                paddingBottom: '10px'
              }}
            >
              This Mobile number is already registered
            </div>
          )}
          <FormGroup>
            <Select
              className="React"
              classNamePrefix="select"
              isClearable={true}
              options={countryCodes}
              name="countryCodes"
              value={selectedItem}
              placeholder="Select Country"
              formatOptionLabel={customOptions}
              onChange={(e) => {
                setSelectedItem(e)
              }}
              // menuIsOpen={false}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col lg="12" md="12" sm="12">
          <FormGroup className="form-label-group">
            <Input
              className="input-label"
              type="tel"
              value={mobileData.phone}
              name="phone"
              onChange={changeHandler}
              onKeyPress={(e) => handleKeyMobileNumber(e)}
              id="data-price1"
              placeholder="Enter Mobile No*"
            />
            <Label
              className={
                themeConfig.theme === 'dark' ? 'dark-label' : 'light-label'
              }
              for="data-price1"
            >
              Mobile No
            </Label>
            {numberError && (
              <span style={{ color: 'red', fontSize: '0.8rem' }}>
                {numberError}
              </span>
            )}
          </FormGroup>
        </Col>
      </Row>
      <div className="loginModalDiv_head">
        <Button.Ripple
          color="warning"
          disabled={!mobileData.phone || validatingmobile}
          onClick={onHandleSubmit}
        >
          Send OTP
        </Button.Ripple>{' '}
      </div>
    </>
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
export default connect(mapStateToProps, {
  validatePhoneNumber
})(MobileEntry)
