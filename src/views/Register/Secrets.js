import React, {useState} from 'react'
import axios from 'axios'
import crypto from 'crypto'
import {Check} from 'react-feather'
import {encryptdata} from 'utility/context/SecurityTool'
import Checkbox from 'components/@vuexy/checkbox/CheckboxesVuexy'
import {Form, FormGroup, Input, Label, Button} from 'reactstrap'
import './Register.css'
import 'swiper/css/swiper.css'
import 'assets/scss/pages/authentication.scss'
import 'assets/scss/plugins/extensions/swiper.scss'

const Register = ({
	email,
	name,
	mobile,
	password,
	seterrMsg,
	setisLoading,
	setsuccessRegister,
	setSecretQues
}) => {
	const [accept, setaccept] = useState(false)
	const [disbaleRegister, setdisbaleRegister] = useState(false)
	const [secretQustion1, setsecretQustion1] = useState()
	const [secretQustion2, setsecretQustion2] = useState()
	const [secretQustion3, setsecretQustion3] = useState()
	const [secretAnswer1, setsecretAnswer1] = useState()
	const [secretAnswer2, setsecretAnswer2] = useState()
	const [secretAnswer3, setsecretAnswer3] = useState()
	// const [validmobile, setvalidMobile] = useState(false)
	const hashPassword2 = async password => {
		const salt = '0e09ca7a4644c68c6c002ed1338bb40b'
		const hash = await crypto
			.pbkdf2Sync(password, salt, 1000, 20, `sha512`)
			.toString(`hex`)
		return hash
	}

	const handleRegister = e => {
		setdisbaleRegister(true)
		setisLoading(true)
		e.preventDefault()
		hashPassword2(password).then(encpassword => {
			e.preventDefault()
			const newPassword = encryptdata(encpassword, false, password)
			const user = {
				email,
				name: encryptdata(name, false, encpassword),
				username: email,
				mobile,
				password: newPassword,
				status: 'emailNotConfirmed',
				secrets: {
					secretQustion1,
					secretQustion2,
					secretQustion3,
					secretAnswer1: encryptdata(encpassword, false, secretAnswer1),
					secretAnswer2: encryptdata(encpassword, false, secretAnswer2),
					secretAnswer3: encryptdata(encpassword, false, secretAnswer3)
				}
			}
			axios
				.post('/backendapi/saveuser', user)
				.then(res => {
					setsuccessRegister(true)
					setisLoading(false)
				})
				.catch(e => {
					seterrMsg('Something went wrong. Please try after sometime!!')
				})
		})
	}
	return (
		<Form action='/' onSubmit={handleRegister}>
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
					required
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
					required
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
			<FormGroup className='form-label-group'>
				<Input
					type='password'
					id='Answer 3'
					name='Answer 3'
					placeholder='Secret Answer 3'
					required
					value={secretAnswer3}
					onChange={e => setsecretAnswer3(e.target.value)}
				/>
				<Label>Secret Answer 3</Label>
			</FormGroup>
			<FormGroup>
				<Checkbox
					color='primary'
					icon={<Check className='vx-icon' size={16} />}
					label=' I accept the terms & conditions.'
					value={accept}
					onChange={() => setaccept(!accept)}
				/>
			</FormGroup>
			<div className='d-flex justify-content-between'>
				<Button.Ripple
					color='warning'
					onClick={e => setSecretQues(e.target.value)}
				>
					Back
				</Button.Ripple>

				<Button.Ripple
					color='warning'
					type='submit'
					disabled={disbaleRegister || !accept}
				>
					Register
				</Button.Ripple>
			</div>
		</Form>
	)
}
export default Register
