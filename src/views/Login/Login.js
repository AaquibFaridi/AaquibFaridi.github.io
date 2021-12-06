import React, {useState} from 'react'
import themeConfig from 'configs/themeConfig'
import {CardBody, FormGroup, Input, Col, Row, Button, Label} from 'reactstrap'
import './Login.css'
import 'swiper/css/swiper.css'
import 'assets/scss/plugins/extensions/swiper.scss'
import crypto from 'crypto'
import 'assets/scss/pages/authentication.scss'
import axios from 'axios'
import {decryptdata, encryptdata} from 'utility/context/SecurityTool'
import '../Register/Register.css'
//
axios.defaults.baseURL = 'http://localhost:5000'

const Register = props => {
	const {setloggedIn} = props
	const [password, setpassword] = useState('')
	const [mobileNo, setmobileNo] = useState('')
	const [errorMsg, seterrorMsg] = useState('')
	const [loginText, setloginText] = useState('Sign In')
	const handleChangeUsername = event => {
		setmobileNo(event.target.value)
	}

	const handleChangePassword = event => {
		setpassword(event.target.value)
	}

	const hashPassword2 = async password => {
		const salt = '0e09ca7a4644c68c6c002ed1338bb40b'
		const hash = await crypto
			.pbkdf2Sync(password, salt, 1000, 20, `sha512`)
			.toString(`hex`)
		return hash
	}

	const handleSubmit = e => {
		seterrorMsg('')
		setloginText('Signing In...')
		if (mobileNo === '' || password === '') {
			seterrorMsg('Invalid Credentials !')
		} else {
			hashPassword2(password).then(encpassword => {
				const newPassword = encryptdata(password, true)
				axios
					.post('/backendapi/user/login', {
						user: mobileNo.trim(),
						password: newPassword
					})
					.then((res, err) => {
						if (
							res?.data?.length > 0 &&
							res?.data[0]?.status !== 'emailNotConfirmed'
						) {
							const resp = res.data[0]
							const secrKey = decryptdata(resp.password, false, password)

							localStorage.setItem('secretkey', secrKey)
							resp.name = decryptdata(resp.name)
							//resp.mobile = decryptdata(resp.mobile)
							resp.dob = decryptdata(resp.dob)
							resp.secondarymobile = decryptdata(resp.secondarymobile)
							resp.address = decryptdata(resp.address)

							resp.assets =
								resp.assets.length > 0
									? JSON.parse(decryptdata(resp.assets[0]))
									: []
							resp.liabilities =
								resp.liabilities.length > 0
									? JSON.parse(decryptdata(resp.liabilities[0]))
									: []
							resp.docs = decryptdata(resp.docs)
							seterrorMsg('')
							localStorage.setItem('logInUserData', JSON.stringify(resp))
							localStorage.setItem('authtoken', res.headers.authtoken)

							localStorage.setItem('logInGreeting', true)
							localStorage.setItem('theme', resp.theme ? resp.theme : 'light')
							// subscribe(resp.email)
							setloggedIn(true)
						} else if (res?.data[0]?.status === 'emailNotConfirmed') {
							const userkey =
								props.routerProps && props.routerProps.match.params.userkey
							if (res.data[0].status === userkey) {
								const resp = res.data[0]
								seterrorMsg('')
								setloggedIn(true)
								localStorage.setItem('logInUserData', JSON.stringify(resp))
								localStorage.setItem('logInGreeting', true)
								// subscribe(resp.email)
								setloggedIn(true)
								axios
									.post('/backendapi/update/login', res.data[0], {
										headers: {
											Authorization: `Bearer ${localStorage.getItem(
												'authtoken'
											)}`
										}
									})
									.then(res => {})
								window.location.reload()
							} else {
								seterrorMsg('Please confirm your email for log in !! ')
								setloginText()
							}
						} else {
							seterrorMsg('Inavlid Credentials')
							setloginText('Sign In')
						}
					})
					.catch(error => {
						if (error.response && error.response.status === 401) {
							seterrorMsg('Inavlid Credentials')
							setloginText('Sign In')
						} else {
							seterrorMsg('Something went Wrong ! Contact Your admin')
							setloginText('Sign In')
						}
					})
			})
		}
	}
	return (
		<CardBody className='pt-1'>
			<div
				className={
					window.screen.width <= 500 ? 'formOTP p-0 mt-1' : 'formOTP pb-0'
				}
			>
				{errorMsg && <h5 style={{color: 'red'}}>{errorMsg}</h5>}
				<Row>
					<Col lg='12' md='12' sm='12'>
						<FormGroup className='form-label-group'>
							<Input
								type='text'
								className='input-label'
								name='user'
								placeholder='Username'
								onChange={handleChangeUsername}
							/>
							<Label
								className={
									themeConfig.theme === 'dark' ? 'dark-label' : 'light-label'
								}
								for='user'
							>
								Username
							</Label>
						</FormGroup>
						<FormGroup className='form-label-group'>
							<Input
								className='input-label'
								type='password'
								name='password'
								placeholder='Password'
								onChange={handleChangePassword}
							/>
							<Label
								className={
									themeConfig.theme === 'dark' ? 'dark-label' : 'light-label'
								}
								for='password'
							>
								Password
							</Label>
						</FormGroup>
					</Col>
				</Row>
				<div className='loginModalDiv_head'>
					<Button.Ripple
						color='warning'
						disabled={
							password === '' ||
							mobileNo === '' ||
							loginText === 'Signing In...'
						}
						onClick={e => handleSubmit(e)}
					>
						{loginText}
					</Button.Ripple>
				</div>
			</div>
		</CardBody>
	)
}
export default Register
