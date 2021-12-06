import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Card, CardBody, Button, Row, Col } from 'reactstrap'

//axios.defaults.timeout = 10000;

const MailConfirm = (props) => {
  const [success, setsuccess] = useState(false)
  const [err, seterr] = useState(false)
  useEffect(() => {
    const userkey = props.match.params.userkey
    if (userkey !== '') {
      axios
        .post(
          '/backendapi/users/verify',
          { key: userkey },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('authtoken')}`
            }
          }
        )
        .then((res) => {
          setsuccess(true)
          seterr(false)
        })
        .catch((e) => {
          setsuccess(false)
          seterr(true)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Row className="m-0">
      <Col sm="12">
        <Card className="auth-card bg-transparent shadow-none rounded-0 mb-0 w-100">
          <CardBody className="text-center">
            <h1
              className="font-large-2 my-1"
              style={{
                color: success ? 'lightgreen' : err ? 'red' : 'white'
              }}
            >
              {success
                ? 'Your email is successfully verified ! You can login now'
                : err
                ? 'Link Expired !!!!!!!!!!!!!!!'
                : 'Please wait while we confirm your email ...'}
            </h1>

            <Button.Ripple
              tag="p"
              onClick={() => {
                props.history.push('/login')
              }}
              color="primary"
              size="lg"
              className="mt-2"
              disabled={!success || err}
            >
              {success
                ? 'Go to Login'
                : err
                ? 'Link Expired !'
                : 'Checking ...'}
            </Button.Ripple>
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}
export default MailConfirm
