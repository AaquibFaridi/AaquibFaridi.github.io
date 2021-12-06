/* eslint-disable prefer-template */
import React, { useState, useEffect } from 'react'
import {
  Row,
  Col,
  Button,
  Form,
  Input,
  Label,
  FormGroup,
  Media,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter
} from 'reactstrap'
import Checkbox from 'components/@vuexy/checkbox/CheckboxesVuexy'
import Radio from 'components/@vuexy/radio/RadioVuexy'
import { Settings, FilePlus, Edit, Check } from 'react-feather'
import avatar1 from 'assets/img/avatar/female.png'
import avatar2 from 'assets/img/avatar/male.png'
import Select from 'react-select'
import axios from 'axios'
import ForgotPassword from 'views/Login/ForgotPassword'

const languages = [
  { value: 'english', label: 'English', color: '#7367f0' },
  { value: 'french', label: 'French', color: '#7367f0' },
  { value: 'german', label: 'German', color: '#7367f0' },
  { value: 'portuguese', label: 'Portuguese', color: '#7367f0' },
  { value: 'arabi', label: 'Arabi', color: '#7367f0' },
  { value: 'chinese', label: 'Chinese', color: '#7367f0' },
  { value: 'hindi', label: 'Hindi', color: '#7367f0' },
  { value: 'russian', label: 'Russian', color: '#7367f0' },
  { value: 'spanish', label: 'Spanish', color: '#7367f0' },
  { value: 'urdu', label: 'Urdu', color: '#7367f0' }
]

const prefixOptions = [
  { value: 'Mr', label: 'Mr', isFixed: false },
  { value: 'Miss', label: 'Miss', isFixed: true },
  { value: 'Mrs', label: 'Mrs', isFixed: true },
  { value: 'Dr', label: 'Dr', isFixed: false }
]
const user = JSON.parse(localStorage.getItem('logInUserData'))

const UserInfoTab = () => {
  const { address } = user
  const [saveButton, setsaveButton] = useState('Save Changes')
  const [dob, setdob] = useState('')
  const [mobile, setmobile] = useState('')
  const [secondarymobile, setsecondarymobile] = useState('')
  const [emailPrimary, setemailPrimary] = useState('')
  const [secondaryemail, setsecondaryemail] = useState('')
  const [firstname, setfirstname] = useState('')
  const [middlename, setmiddlename] = useState('')
  const [lastname, setlastname] = useState('')
  const [language, setlanguage] = useState('')
  const [pwdtime, setpwdtime] = useState('')
  const [postalCode, setpostalCode] = useState(address?.postalCode)
  const [address1, setaddress1] = useState(address?.address1)
  const [address2, setaddress2] = useState(address?.address2)
  const [city, setcity] = useState(address?.city)
  const [state, setstate] = useState(address?.state)
  const [country, setcountry] = useState(address?.country)
  const [salutation, setsalutation] = useState('')
  const [hidden, sethidden] = useState(true)
  const [detailsPresent, setdetailsPresent] = useState(false)
  const [theme, settheme] = useState('')
  const [infoModal, setinfoModal] = useState(false)
  const [category, setCategory] = useState(false)
  const [changeModal, setChangeModal] = useState(false)
  useEffect(() => {
    const names = user?.name ? user?.name.split(' ') : user?.username.split(' ')
    let firstname = ''
    let middlename = ''
    let lastname = ''
    if (names?.length === 1) {
      firstname = names[0]
    } else if (names?.length === 2) {
      firstname = names[0]
      lastname = names[1]
    }
    if (names?.length === 3) {
      firstname = names[0]
      lastname = names[2]
      middlename = names[1]
    }
    if (names?.length > 3) {
      firstname = names[0]
      for (let i = 1; i < names?.length - 1; i = i + 1) {
        middlename = middlename + ' ' + names[i]
      }
      lastname = names[2]
      middlename = names[names?.length - 1]
    }
    setfirstname(firstname)
    setmiddlename(middlename)
    setlastname(lastname)
    setemailPrimary(user?.email)
    setmobile(user?.mobile)

    if (
      user?.address?.address1 &&
      user?.address?.address2 &&
      user?.address?.city &&
      user?.address?.country &&
      user?.address?.postalCode &&
      user?.address?.state &&
      user?.language &&
      user?.theme &&
      user?.pwdtime &&
      user?.communication.length > 0
    ) {
      setdetailsPresent(true)
    }
  }, [])
  const handledob = (date) => {
    setdob(date)
  }
  const updateuser = (e) => {
    e.preventDefault()
    setsaveButton('Saving ...')
    user.dob = dob
    user.pwdtime = pwdtime
    user.theme = theme
    user.secondarymobile = secondarymobile
    user.secondaryemail = secondaryemail
    user.language = language
    user.salutation = salutation
    user.name = firstname + ' ' + middlename + ' ' + lastname
    user.mobile = mobile
    const add = {
      address1,
      address2,
      postalCode,
      city,
      state,
      country
    }
    user.address = add
    localStorage.setItem('logInUserData', JSON.stringify(user))
    localStorage.setItem('theme', theme)
    axios
      .post(
        '/backendapi/adddetails',
        { _id: user._id, user },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('authtoken')
          }
        }
      )
      .then((res) => {
        setsaveButton('Save Changes')
        window.location.reload()
      })
      .catch()
  }
  const pwdtimeChange = (e, i) => {
    setpwdtime(i)
  }
  const animateLabel = (value) => {
    sethidden(!hidden)
  }
  const openInfoModal = (value) => {
    setinfoModal(value)
  }
  const toggleChange = () => {
    setChangeModal(!changeModal)
  }
  const openChange = (event) => {
    event.preventDefault()
    const { name } = event.target
    setChangeModal(true)
    setCategory(name)
  }
  return (
    <>
      <Modal
        isOpen={infoModal}
        className="modal-dialog-centered"
        fade={true}
        style={{ maxWidth: '800px' }}
        backdrop="static"
      >
        <ModalHeader toggle={() => openInfoModal(false)} />
        <ModalBody>
          <Col
            sm="12"
            className={window.screen.width <= 500 ? 'd-block' : 'd-flex'}
          >
            <Col md={window.screen.width <= 500 ? '12' : '6'}>
              <Row xs="1">
                <FormGroup>
                  <Label for="address1">Address Line 1</Label>
                  <Input
                    type="text"
                    id="address1" //placeholder="Address Line 1"
                    value={address1}
                    onChange={(e) => setaddress1(e.target.value)}
                  />
                </FormGroup>
              </Row>
              <Row xs="1">
                <FormGroup>
                  <Label for="address1">Address Line 2</Label>
                  <Input
                    type="text"
                    id="address1" //placeholder="Address Line 2"
                    value={address2}
                    onChange={(e) => setaddress2(e.target.value)}
                  />
                </FormGroup>
              </Row>
              <Row xs="1">
                <FormGroup>
                  <Label for="pincode">Pincode</Label>
                  <Input
                    type="number"
                    id="pincode" //placeholder="Pincode"
                    value={postalCode}
                    onChange={(e) => setpostalCode(e.target.value)}
                  />
                </FormGroup>
              </Row>
              <Row xs="1">
                <FormGroup>
                  <Label for="city">City</Label>
                  <Input
                    type="text"
                    //defaultValue="Camden Town"
                    id="city"
                    //placeholder="City"
                    value={city}
                    onChange={(e) => setcity(e.target.value)}
                  />
                </FormGroup>
              </Row>
              <Row xs="1">
                <FormGroup>
                  <Label for="State">State</Label>
                  <Input
                    type="text"
                    //defaultValue="London"
                    id="State"
                    //placeholder="State"
                    value={state}
                    onChange={(e) => setstate(e.target.value)}
                  />
                </FormGroup>
              </Row>
              <Row xs="1">
                <FormGroup>
                  <Label for="Country">Country</Label>
                  <Input
                    type="text"
                    //defaultValue="UK"
                    id="Country"
                    //placeholder="Country"
                    value={country}
                    onChange={(e) => setcountry(e.target.value)}
                  />
                </FormGroup>
              </Row>
            </Col>
            <Col
              md={window.screen.width <= 500 ? '12' : '6'}
              sm={{ size: 'auto', offset: 1 }}
            >
              <Row>
                <FormGroup style={{ marginBottom: '1rem' }}>
                  <Label className="d-block mb-50" for="communication">
                    Communication
                  </Label>
                  <div className="d-inline-block mr-1">
                    <Checkbox
                      color="primary"
                      icon={<Check className="vx-icon" size={16} />}
                      label="Email"
                      disabled={true}
                      defaultChecked={true}
                    />
                  </div>
                  <br />{' '}
                  <div className="d-inline-block mr-1">
                    <Checkbox
                      color="primary"
                      icon={<Check className="vx-icon" size={16} />}
                      label="SMS"
                      disabled={true}
                      defaultChecked={true}
                    />
                  </div>
                  <br />
                  <div className="d-inline-block">
                    <Checkbox
                      color="primary"
                      icon={<Check className="vx-icon" size={16} />}
                      label="Phone"
                      disabled={true}
                      defaultChecked={true}
                    />
                  </div>
                </FormGroup>
              </Row>
              <Row>
                <FormGroup style={{ marginBottom: '1rem' }}>
                  <Label className="d-block mb-50">Theme</Label>
                  <div className="d-inline-block mr-1">
                    <Radio
                      label="Dark"
                      color="primary"
                      defaultChecked={user?.theme === 'dark' ? true : false}
                      name="theme"
                      onChange={(e) => settheme('dark')}
                    />
                  </div>
                  <br />
                  <div className="d-inline-block mr-1">
                    <Radio
                      label="Light"
                      color="primary"
                      defaultChecked={user?.theme === 'dark' ? false : true}
                      name="theme"
                      onChange={(e) => settheme('light')}
                    />
                  </div>
                </FormGroup>
              </Row>
              <Row>
                <FormGroup style={{ marginBottom: '1rem' }}>
                  <Label className="d-block mb-50">Gender</Label>
                  <div className="d-inline-block mr-1">
                    <Radio
                      label="Male"
                      color="primary"
                      defaultChecked={user?.salutation === 'Mr' ? true : false}
                      name="gender"
                      disabled={true}
                    />
                  </div>
                  <br />
                  <div className="d-inline-block mr-1">
                    <Radio
                      label="Female"
                      color="primary"
                      defaultChecked={user?.salutation === 'Mr' ? false : true}
                      name="gender"
                      disabled={true}
                    />
                  </div>
                  <br />
                  <div className="d-inline-block">
                    <Radio
                      label="Others"
                      color="primary"
                      defaultChecked={false}
                      name="gender"
                      disabled={true}
                    />
                  </div>
                </FormGroup>
              </Row>
              <Row>
                <FormGroup style={{ marginBottom: '1rem' }}>
                  <Label className="d-block mb-50">
                    Password Show Time in Password Vault
                  </Label>
                  <div className="d-inline-block mr-1">
                    <Radio
                      label="3 Seconds"
                      color="primary"
                      defaultChecked={
                        pwdtime === 3 ? true : pwdtime ? false : true
                      }
                      name="pwd"
                      onChange={(e) => {
                        pwdtimeChange(e, 3)
                      }}
                    />
                  </div>
                  <br />
                  <div className="d-inline-block mr-1">
                    <Radio
                      label="5 Seconds"
                      color="primary"
                      defaultChecked={pwdtime === 5 ? true : false}
                      name="pwd"
                      onChange={(e) => {
                        pwdtimeChange(e, 5)
                      }}
                    />
                  </div>
                  <br />
                  <div className="d-inline-block">
                    <Radio
                      label="10 Seconds"
                      color="primary"
                      defaultChecked={pwdtime === 10 ? true : false}
                      name="pwd"
                      onChange={(e) => {
                        pwdtimeChange(e, 10)
                      }}
                    />
                  </div>
                </FormGroup>
              </Row>
            </Col>
          </Col>
        </ModalBody>
        <ModalFooter className="justify-content-center">
          <Button color="warning" onClick={() => openInfoModal(false)}>
            OK
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={changeModal} toggle={toggleChange} centered={true}>
        <ModalHeader
          className="loginModalDiv_head"
          toggle={() => toggleChange()}
        >
          {category === 'secrets'
            ? 'Update Secret Questions'
            : 'Change Password'}
        </ModalHeader>
        <ModalBody>
          <div className="loginModalDiv_container">
            <ForgotPassword
              change
              category={category}
              email={emailPrimary}
              backtoLogin={() => toggleChange()}
            />
          </div>
        </ModalBody>
      </Modal>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Col className="mt-1">
          <Row className="mt-1" sm="12">
            <Media className="mb-2 ml-1">
              <Media className="mr-2 my-25" left href="#">
                <Media
                  className="users-avatar-shadow rounded"
                  object
                  src={user && user.salutation === 'Mr' ? avatar2 : avatar1}
                  alt="user profile image"
                  height="84"
                  width="84"
                />
              </Media>
              <Media
                body
                className="mt-3 font-medium-1 text-bold-600"
                tag="p"
                heading
              >
                {user?.name}
              </Media>
            </Media>
            <Button
              style={{
                width: window.screen.width <= 500 ? '100%' : 'max-content',
                margin:
                  window.screen.width <= 500
                    ? '2rem 14px 0'
                    : '2rem 1rem auto auto'
              }}
              className="h-100"
              color="warning"
              name="secrets"
              outline
              onClick={openChange}
            >
              Update Secret Questions
            </Button>
            <Button
              style={{
                width: window.screen.width <= 500 ? '100%' : 'max-content',
                margin:
                  window.screen.width <= 500
                    ? '2rem 14px'
                    : '2rem 1rem auto auto'
              }}
              className="h-100"
              color="warning"
              name="pwd"
              outline
              onClick={openChange}
            >
              Change Password
            </Button>
          </Row>
          <Row sm="">
            <Col
              md={
                window.screen.width <= 500
                  ? '12'
                  : window.screen.width >= 768 && window.screen.width <= 1024
                  ? '3'
                  : '2'
              }
            >
              <FormGroup>
                <Select
                  isMulti={false}
                  isClearable={false}
                  options={prefixOptions}
                  className="React"
                  classNamePrefix="salutation"
                  placeholder="Salutation"
                  //defaultValue={prefixOptions[0]}
                  value={{
                    value: salutation,
                    label: salutation ? salutation : 'Salutation',
                    isFixed: false
                  }}
                  onChange={(e) => setsalutation(e && e.value ? e.value : null)}
                />
              </FormGroup>
            </Col>
            <Col
              md={
                window.screen.width <= 500
                  ? '12'
                  : window.screen.width >= 768 && window.screen.width <= 1024
                  ? '3'
                  : '2'
              }
            >
              <FormGroup>
                <Input
                  type="text"
                  placeholder="First Name"
                  required
                  value={firstname}
                  onChange={(e) => setfirstname(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col
              md={
                window.screen.width <= 500
                  ? '12'
                  : window.screen.width >= 768 && window.screen.width <= 1024
                  ? '3'
                  : '2'
              }
            >
              <FormGroup>
                <Input
                  placeholder="Middle Name"
                  type="text"
                  value={middlename}
                  onChange={(e) => setmiddlename(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col
              md={
                window.screen.width <= 500
                  ? '12'
                  : window.screen.width >= 768 && window.screen.width <= 1024
                  ? '3'
                  : '2'
              }
            >
              <FormGroup>
                <Input
                  type="text"
                  placeholder="Last Name"
                  required
                  value={lastname}
                  onChange={(e) => setlastname(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col
              md={
                window.screen.width <= 500
                  ? '12'
                  : window.screen.width >= 768 && window.screen.width <= 1024
                  ? '3'
                  : '2'
              }
            >
              <FormGroup>
                <Select
                  languages
                  defaultValue={languages.filter((e) => {
                    return e.value === language
                  })}
                  isClearable={true}
                  options={languages}
                  className="React"
                  placeholder="Languages"
                  classNamePrefix="salutation"
                  id="languages"
                  onChange={(e) => setlanguage(e ? e.value : undefined)}
                />
              </FormGroup>
            </Col>
            <Col
              md={
                window.screen.width <= 500
                  ? '12'
                  : window.screen.width >= 768 && window.screen.width <= 1024
                  ? '3'
                  : '2'
              }
            >
              <FormGroup>
                <Input
                  type="Date"
                  name="dob"
                  placeholder="Date of birth"
                  // value=
                  onChange={(e) => handledob(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col
              md={
                window.screen.width <= 500
                  ? '12'
                  : window.screen.width >= 768 && window.screen.width <= 1024
                  ? '3'
                  : '4'
              }
            >
              <FormGroup>
                <Input
                  type="email"
                  placeholder="Primary Email"
                  required
                  disabled={true}
                  value={emailPrimary}
                />
              </FormGroup>
            </Col>
            <Col
              md={
                window.screen.width <= 500
                  ? '12'
                  : window.screen.width >= 768 && window.screen.width <= 1024
                  ? '3'
                  : '4'
              }
            >
              <FormGroup>
                <Input
                  type="email"
                  placeholder="Secondary Email"
                  required
                  value={secondaryemail}
                  onChange={(e) => setsecondaryemail(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col
              md={
                window.screen.width <= 500
                  ? '12'
                  : window.screen.width >= 768 && window.screen.width <= 1024
                  ? '3'
                  : '2'
              }
            >
              <FormGroup>
                <Input
                  type="tel"
                  placeholder="Primary Contact"
                  required
                  value={mobile}
                  onChange={(e) => setmobile(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col
              md={
                window.screen.width <= 500
                  ? '12'
                  : window.screen.width >= 768 && window.screen.width <= 1024
                  ? '3'
                  : '2'
              }
            >
              <FormGroup>
                <Input
                  type="number"
                  placeholder="Secondary Contact"
                  required
                  value={secondarymobile}
                  onChange={(e) => setsecondarymobile(e.target.value)}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row
            sm="12"
            className="d-flex justify-content-between flex-wrap"
            style={{
              position: 'relative',
              bottom: window.screen.width <= 500 ? 0 : '-5rem'
            }}
          >
            {window.screen.width > 1000 && (
              <Col md="4" className="d-flex">
                <Button
                  type="button"
                  className="add-button"
                  color="warning"
                  onMouseEnter={() => {
                    animateLabel()
                  }}
                  style={{ height: '45px', width: '45px' }}
                >
                  <Settings size="25" style={{ margin: '8px' }} />
                </Button>

                <div
                  className="add-info-div"
                  style={{ width: !detailsPresent ? '85px' : '110px' }}
                >
                  <div className={hidden ? 'no-display' : 'button-text'}>
                    {!detailsPresent ? (
                      <FilePlus size="18" />
                    ) : (
                      <Edit size="18" />
                    )}
                    <label
                      onClick={() => openInfoModal(true)}
                      style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        position: 'relative',
                        top: '3px',
                        cursor: 'pointer'
                      }}
                    >
                      {!detailsPresent ? 'Add Info' : 'Update Info'}
                    </label>
                  </div>
                </div>
              </Col>
            )}
            {window.screen.width <= 1000 && (
              <Col md="12">
                <div className="add-info-div" style={{ textAlign: 'end' }}>
                  <Button
                    type="button"
                    style={{
                      width: 'max-content'
                    }}
                    color="white"
                    onClick={() => openInfoModal(true)}
                  >
                    <div className="button-text">
                      <label
                        style={{
                          fontSize: '14px',
                          fontWeight: '600',
                          position: 'relative',
                          top: '2px',
                          cursor: 'pointer'
                        }}
                      >
                        {!detailsPresent ? 'Add Info' : 'Update Info'}
                      </label>
                      {!detailsPresent ? (
                        <FilePlus size="18" />
                      ) : (
                        <Edit size="18" />
                      )}
                    </div>
                  </Button>
                </div>
              </Col>
            )}
            <Col className="d-flex justify-content-end flex-wrap" md="8">
              <Button.Ripple
                color="flat-warning"
                style={{ width: 'max-content' }}
              >
                Reset
              </Button.Ripple>
              <Button.Ripple
                className=""
                color="primary"
                onClick={(e) => {
                  updateuser(e)
                }}
                style={{ width: 'max-content' }}
              >
                {saveButton}
              </Button.Ripple>
            </Col>
          </Row>
        </Col>
      </Form>
    </>
  )
}
export default UserInfoTab
