import React from 'react'
import {Form, FormGroup, Input, Label, Button} from 'reactstrap'
import './Register.css'
import 'swiper/css/swiper.css'
import 'assets/scss/pages/authentication.scss'
import 'assets/scss/plugins/extensions/swiper.scss'
import SetPassword from '../Login/SetPassword'

const Register = ({
	seterrMsg,
	mobile,
	secretQues,
	setSecretQues,
	name,
	setname,
	email,
	setemail,
	password,
	setpassword,
	confirmPass,
	setconfirmPass
}) => {
	const callnext = e => {
		e.preventDefault()
		if (confirmPass === password) {
			setSecretQues(!secretQues)
		} else {
			seterrMsg('Passwords do not match')
			e.preventDefault()
		}
	}

	return (
		<div>
			<Form action='/' onSubmit={callnext}>
				<FormGroup className='form-label-group'>
					<Input
						placeholder='Verified Mobile Number*'
						autoComplete={false}
						value={mobile}
						disabled
					/>
					<Label>Phone Number</Label>
				</FormGroup>
				<FormGroup className='form-label-group'>
					<Input
						type='text'
						placeholder='Name'
						required
						autoComplete={false}
						value={name}
						onChange={e => setname(e.target.value)}
						name='fullname'
					/>
					<Label>Full Name</Label>
				</FormGroup>
				<FormGroup className='form-label-group'>
					<Input
						type='email'
						placeholder='Email'
						required
						autoComplete={false}
						value={email}
						name='emailid'
						onChange={e => setemail(e.target.value)}
					/>
					<Label>Email</Label>
				</FormGroup>
				<SetPassword
					signup
					setconfirmPass={setconfirmPass}
					setpassword={setpassword}
					password={password}
					confirmPass={confirmPass}
				/>
				{/* <FormGroup className="form-label-group">
          <Input
            type="password"
            placeholder="Password"
            required
            autoComplete={false}
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
          <Label>Password</Label>
        </FormGroup>
        <FormGroup className="form-label-group">
          <Input
            type="password"
            placeholder="Confirm Password"
            required
            autoComplete={false}
            value={confirmPass}
            onChange={(e) => setconfirmPass(e.target.value)}
          />
          <Label>Confirm Password</Label>
        </FormGroup> */}

				<div className='d-flex justify-content-center'>
					<Button.Ripple color='warning' type='submit'>
						Next
					</Button.Ripple>
				</div>
			</Form>
		</div>
	)
}
export default Register
