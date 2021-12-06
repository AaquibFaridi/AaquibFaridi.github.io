import React, {useState} from 'react'
import {Spinner} from 'reactstrap'
import Basicdetails from './BasicDetails'
import Secrets from './Secrets'

const Register = ({
	isLoading,
	setisLoading,
	seterrMsg,
	mobile,
	setsuccessRegister
}) => {
	const [secretQues, setSecretQues] = useState(false)
	const [name, setname] = useState('')
	const [email, setemail] = useState('')
	// const [validmobile, setvalidMobile] = useState(false)
	const [password, setpassword] = useState('')
	const [confirmPass, setconfirmPass] = useState('')
	return (
		<>
			{!secretQues ? (
				<div>
					{isLoading ? (
						<Spinner
							color='danger'
							size='lg'
							style={{justifyContent: 'center'}}
						/>
					) : (
						<Basicdetails
							seterrMsg={seterrMsg}
							mobile={mobile}
							secretQues={secretQues}
							setSecretQues={setSecretQues}
							name={name}
							setname={setname}
							email={email}
							setemail={setemail}
							password={password}
							setpassword={setpassword}
							confirmPass={confirmPass}
							setconfirmPass={setconfirmPass}
						/>
					)}
				</div>
			) : (
				<div>
					<Secrets
						email={email}
						name={name}
						mobile={mobile}
						password={password}
						seterrMsg={seterrMsg}
						setisLoading={setisLoading}
						setsuccessRegister={setsuccessRegister}
						setSecretQues={setSecretQues}
					/>
				</div>
			)}
		</>
	)
}
export default Register
