/* eslint-disable no-control-regex */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import crypto from 'crypto'
import {validatePhoneNumber} from 'redux/actions/auth/phoneValidate'
import {toast} from 'react-toastify'
import {encryptdata} from 'utility/context/SecurityTool'
import 'assets/scss/pages/authentication.scss'
import {FormGroup, Form, Input, Button, Label} from 'reactstrap'
const SecretQues = props => {
	const {editDetails, backtoLogin} = props
	const {
		secrets: {
			secretQustion1: sq1 = {},
			secretQustion2: sq2 = {},
			secretQustion3: sq3 = {}
		} = {}
	} = {...editDetails}
	const [disbaleRegister, setdisbaleRegister] = useState(false)
	const [secretQustion1, setsecretQustion1] = useState(sq1)
	const [secretQustion2, setsecretQustion2] = useState(sq2)
	const [secretQustion3, setsecretQustion3] = useState(sq3)
	const [secretAnswer1, setsecretAnswer1] = useState('')
	const [secretAnswer2, setsecretAnswer2] = useState('')
	const [secretAnswer3, setsecretAnswer3] = useState('')
	const [errMsg, setErrMsg] = useState()
	const hashPassword2 = async password => {
		const salt = '0e09ca7a4644c68c6c002ed1338bb40b'
		const hash = await crypto
			.pbkdf2Sync(password, salt, 1000, 20, `sha512`)
			.toString(`hex`)
		return hash
	}
	const handleSecrets = e => {
		setdisbaleRegister(true)
		e.preventDefault()
		const userD = JSON.parse(localStorage.getItem('logInUserData'))
		const key = localStorage.getItem('secretkey')
		hashPassword2(key).then(encpassword => {
			e.preventDefault()
			const user = {
				_id: userD._id
			}
			const secrets = {}
			if (secretAnswer1) {
				secrets.secretQustion1 = secretQustion1
				secrets.secretAnswer1 = encryptdata(encpassword, false, secretAnswer1)
			}
			if (secretAnswer2) {
				secrets.secretQustion2 = secretQustion2
				secrets.secretAnswer2 = encryptdata(encpassword, false, secretAnswer2)
			}
			if (secretAnswer3) {
				secrets.secretQustion3 = secretQustion3
				secrets.secretAnswer3 = encryptdata(encpassword, false, secretAnswer3)
			}
			if (Object.keys(secrets).length) {
				user.secrets = secrets
				toast.info('Updating...')
				axios
					.post('/backendapi/update/secrets', user, {
						headers: {
							Authorization: `Bearer ${localStorage.getItem('authtoken')}`
						}
					})
					.then(res => {
						toast.info('Secret Questions and Answers updated Successfully')
					})
					.catch(e => {
						toast.error('Something went wrong. Please try again!!')
						setErrMsg('Something went wrong. Please try after sometime!!')
					})
			}
		})
	}
	return (
		<Form action='/' onSubmit={handleSecrets}>
			<FormGroup className='form-label-group'>
				<Input
					type='text'
					id='Question 1'
					name='Question 1'
					placeholder='Secret Question 1'
					required
					value={secretQustion1}
					onChange={e => setsecretQustion1(e.target.value)}
				/>
				<Label>Secret Question 1</Label>
			</FormGroup>
			<FormGroup className='form-label-group'>
				<Input
					type='password'
					id='Question 1'
					name='Question 1'
					placeholder='Secret Answer 1'
					value={secretAnswer1}
					onChange={e => setsecretAnswer1(e.target.value)}
				/>
				<Label>Secret Answer 1</Label>
			</FormGroup>
			<FormGroup className='form-label-group'>
				<Input
					type='text'
					id='Question 2'
					name='Question 2'
					placeholder='Secret Question 2'
					required
					value={secretQustion2}
					onChange={e => setsecretQustion2(e.target.value)}
				/>
				<Label>Secret Question 2</Label>
			</FormGroup>
			<FormGroup className='form-label-group'>
				<Input
					type='password'
					id='Answer 2'
					name='Answer 2'
					placeholder='Secret Answer 2'
					value={secretAnswer2}
					onChange={e => setsecretAnswer2(e.target.value)}
				/>
				<Label>Secret Answer 2</Label>
			</FormGroup>
			<FormGroup className='form-label-group'>
				<Input
					type='text'
					id='Question 3'
					name='Question 3'
					placeholder='Secret Question 3'
					required
					value={secretQustion3}
					onChange={e => setsecretQustion3(e.target.value)}
				/>
				<Label>Secret Question 3</Label>
			</FormGroup>
			{errMsg && <h5 style={{color: 'red'}}>{errMsg}</h5>}
			<FormGroup className='form-label-group'>
				<Input
					type='password'
					id='Answer 3'
					name='Answer 3'
					placeholder='Secret Answer 3'
					value={secretAnswer3}
					onChange={e => setsecretAnswer3(e.target.value)}
				/>
				<Label>Secret Answer 3</Label>
			</FormGroup>
			<div className='d-flex justify-content-between'>
				<Button.Ripple color='warning' onClick={() => backtoLogin()}>
					Cancel
				</Button.Ripple>

				<Button.Ripple color='warning' type='submit' disabled={disbaleRegister}>
					Update
				</Button.Ripple>
			</div>
		</Form>
	)
}
function mapStateToProps(state) {
	const {auth} = state
	const {phoneotp} = auth
	return {
		validatedmobile: phoneotp?.validatedmobile,
		validatingotp: phoneotp?.validatingotp
	}
}

export default connect(mapStateToProps, {
	validatePhoneNumber
})(SecretQues)
