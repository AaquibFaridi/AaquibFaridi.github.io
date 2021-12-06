import React, { useState } from 'react'
import { Row, Col, Button, Input, Label, FormGroup } from 'reactstrap'
import axios from 'axios'
import Select from 'react-select'
import 'assets/scss/plugins/extensions/dropzone.scss'

const contactUsOptions = [
  {
    value: 'Query',
    label: 'Query',
    color: '#00B8D9',
    isFixed: true
  },
  {
    value: 'Complain',
    label: 'Complain',
    color: '#00B8D9',
    isFixed: true
  },
  {
    value: 'Feedback',
    label: 'Feedback',
    color: '#00B8D9',
    isFixed: true
  }
]
const user = JSON.parse(localStorage.getItem('logInUserData'))

const UserAccountTab = (props) => {
  const [saveButtonText, setsaveButtonText] = useState('Save')
  const [contactUsFormType, setcontactUsFormType] = useState('')
  const [contactUsDescription, setcontactUsDescription] = useState('')
  const selectCustomRef = React.createRef()
  const postContactUsForm = (e) => {
    e.preventDefault()
    setsaveButtonText('Saving ...')
    localStorage.setItem('logInUserData', JSON.stringify(user))
    axios
      .post('/backendapi/adddetails', user, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authtoken')}`
        }
      })
      .then((res) => {
        window.location.reload()
      })
      .catch()
  }
  return (
    <>
      <Row xs="1">
        <FormGroup className="form-label-group">
          <Select
            id="optionSelect"
            className="React"
            ref={selectCustomRef}
            classNamePrefix="select"
            isClearable={true}
            options={contactUsOptions}
            placeholder="Choose a topic..."
            onChange={(e) => setcontactUsFormType(e ? e.value : '')}
          />{' '}
          <Label for="optionSelect">Choose a topic *:</Label>
        </FormGroup>
      </Row>
      <Row>
        <Label for="description" className="mt-2">
          Description *
        </Label>
        <Input
          className="mt-50"
          type="textarea"
          placeholder="Description"
          rows="5"
          id="description"
          onChange={(e) => setcontactUsDescription(e.target.value)}
        />
      </Row>
      <Row>
        <Label for="attachment" className="mt-2">
          Attachments
        </Label>
        <Input
          className="mt-50"
          type="File"
          placeholder="Attachments"
          rows="5"
          id="attachment"
        />
      </Row>

      <Col className="d-flex justify-content-end flex-wrap mt-2" sm="12">
        <Button.Ripple
          color="warning"
          disabled={!(contactUsDescription.length && contactUsFormType.length)}
          className="button-label"
          onClick={(e) => postContactUsForm(e)}
        >
          {saveButtonText}
        </Button.Ripple>
      </Col>
    </>
  )
}
export default UserAccountTab
