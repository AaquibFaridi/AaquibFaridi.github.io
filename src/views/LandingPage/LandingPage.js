/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react'
import {
	// Card,
	// CardTitle,
	// CardBody,
	Row
	// Col,
	// Form,
	// Input,
	// FormGroup,
	// Label,
	// Button
} from 'reactstrap'
import {connect} from 'react-redux'
// import {Monitor, Smartphone, Tablet} from 'react-feather'
import 'assets/scss/pages/authentication.scss'
import AlwaysOn from './AlwaysOn'
// import useWindowSize from 'utility/context/useWindowSize'
const LandingPage = props => {
	const {download} = props
	const [plan, setplan] = useState(false)
	const [why, setwhy] = useState(true)
	const [feature, setfeature] = useState(false)
	const deviceWidth = window.screen.width
	// const deviceWidth = useWindowSize().width
	const [email, setEmail] = useState('')
	const [q, setQ] = useState('')
	const handlingemail = e => {
		e.preventDefault()
		setEmail(e.target.value)
	}
	const handlingContact = e => {
		e.preventDefault()
		setEmail(e.target.value)
	}
	const handlingq = e => {
		e.preventDefault()
		setQ(e.target.value)
	}

	useEffect(() => {
		plan && document.getElementById('plan').scrollIntoView({behavior: 'smooth'})
		why && document.getElementById('whyUs').scrollIntoView({behavior: 'smooth'})
		feature &&
			document.getElementById('feature').scrollIntoView({behavior: 'smooth'})
		download &&
			document
				.getElementById('DownloadOptions')
				.scrollIntoView({behavior: 'smooth'})
	}, [plan, why, feature, download])

	return (
		<div>
			<Row className='d-flex align-items-center justify-content-center m-0'>
				<div className='w-100'>
					<div
						className='w-100 d-block'
						style={{
							minHeight: '0px',
							marginTop: '0px',
							overflow: 'hidden'
						}}
					>
						<AlwaysOn
							plan={plan}
							setplan={setplan}
							why={why}
							setwhy={setwhy}
							feature={feature}
							setfeature={setfeature}
							download={download}
						/>
					</div>
					{/* <Row className="w-100 m-0">
            <Col className={plan || why || feature ? 'mt-0' : 'mt-2'}>
              <Card className="mb-0">
                <CardTitle style={{ textAlign: 'center', paddingTop: '10px' }}>
                  <h3>You can access your account from any platform</h3>
                </CardTitle>
                <CardBody className="text-center">
                  <div className="divider"></div>
                  <Row className="mt-3">
                    <Col className="text-center justify-content-center">
                      <Smartphone size="35" />
                      <h5>Android</h5>
                    </Col>
                    <Col className="text-center justify-content-center">
                      <Tablet size="35" />
                      <h5>iOS</h5>
                    </Col>
                    <Col className="text-center justify-content-center">
                      <Monitor size="35" />
                      <h5>Web</h5>
                    </Col>
                  </Row>
                  <div className="divider">
                    <span className="divider-text">
                      <h5>Query/Feedback</h5>
                    </span>
                  </div>
                  <Form>
                    <FormGroup className="form-label-group mt-2">
                      <Input
                        placeholder="Email"
                        className="text-center mb-1"
                        onChange={handlingemail}
                      />
                      <Label>Email</Label>
                      <Input
                        placeholder="ContactNo."
                        className="text-center mb-1"
                        onChange={handlingContact}
                      />
                      <Label>Contact Number</Label>

                      <Input
                        placeholder="Query/Suggestion"
                        className="text-center"
                        onChange={handlingq}
                      />
                      <Label>Query/Suggestion</Label>
                    </FormGroup>
                  </Form>
                  <Button.Ripple
                    block
                    color={email && q ? 'warning' : 'primary'}
                    className="btn-block"
                  >
                    Submit
                  </Button.Ripple>
                </CardBody>
              </Card>
            </Col>
          </Row> */}
				</div>
			</Row>
		</div>
	)
}
const mapStateToProps = state => {
	const user = state.auth
	const {customizer} = state?.customizer
	return {
		messages: customizer?.language?.Dashboard,
		sender: customizer?.language?.Sender,
		user,
		plan: user?.login?.plan,
		why: user?.login?.why,
		download: user?.login?.download,
		feature: user?.login?.feature
	}
}
export default connect(mapStateToProps)(LandingPage)
