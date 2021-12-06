/* eslint-disable radix */
import React, {useState, useEffect} from 'react'
import {validateOTP, resendOTP} from 'redux/actions/auth/phoneValidate'
import {connect} from 'react-redux'
import {Input, Button} from 'reactstrap'
const MobileInputLogin = props => {
	const {
		setUserID,
		validatingotp,
		validatedotp,
		validateOTP,
		resendOTP,
		userData,
		otpKey,
		user = null
	} = props
	const initialMinute = parseInt('00')
	const initialSeconds = parseInt('20')
	const intialResendOTPTime = parseInt('10')
	const [seconds, setSeconds] = useState(initialSeconds)
	const [minutes, setMinutes] = useState(initialMinute)
	const [otpResendTime, setOTPResendTime] = useState(intialResendOTPTime)
	const [otpError, setotpError] = useState()
	const [invalidOTP, setInvalidOTP] = useState(false)
	const [resendOTPcall, setResendOTPCall] = useState(0)
	const [disabled, setDisabled] = useState(false)
	const [otpNumber, setOtpNumber] = useState('')

	useEffect(() => {
		const myInterval = setInterval(() => {
			if (seconds > 0) {
				setSeconds(seconds - 1)
			}
			if (seconds === 0) {
				if (minutes === 0) {
					clearInterval(myInterval)
					setDisabled(true)
				} else {
					setMinutes(minutes - 1)
					setSeconds(59)
				}
			}
			if (otpResendTime > 0) {
				setOTPResendTime(otpResendTime - 1)
			}
			if (otpResendTime === 0) {
				setResendOTPCall(1)
				setOTPResendTime(30)
			}
		}, 1000)
		return () => {
			clearInterval(myInterval)
		}
	})
	useEffect(() => {
		if (validatedotp) {
			validatedotp === 'ok'
				? setUserID(userData?.phone || user?.email)
				: validatedotp === 'expired'
				? setotpError('OTP expired')
				: setotpError('Invalid OTP')
			clearInterval()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [validatedotp])
	async function handleResendOTP(e) {
		setResendOTPCall(0)
		setOTPResendTime(30)
		setMinutes(0)
		setSeconds(20)
		const AuthData = {
			_id_OTP: 'ID pertaining to previous ID'
		}
		try {
			await resendOTP(AuthData)
			setOtpNumber('')
		} catch (error) {
			console.log(error)
		}
	}
	function handleChangeInput(e) {
		setOtpNumber(e.target.value.replace(/\d{5}/, otpNumber))
	}
	function handleContinue(e) {
		if (!otpNumber) setInvalidOTP(true)
		validateOTP({otp: otpNumber, key: otpKey})
		clearInterval()
	}
	return (
		<>
			<div
				className='otp'
				style={{
					margin: 'auto',
					width: '240px',
					overflow: 'hidden'
				}}
			>
				<div className='otp_div'>
					<Input
						id='partitioned'
						className='otp_box'
						autoFocus
						type='number'
						inputMode='numeric'
						value={otpNumber}
						onChange={handleChangeInput}
					/>
				</div>
			</div>
			<div style={{padding: '5px', textAlign: 'center'}}>
				<div>
					{minutes === 0 && seconds === 0 ? null : (
						<span
							style={{
								color: 'var(--warning)',
								fontWeight: '600'
							}}
						>
							{minutes}:{seconds < 10 ? `0${seconds}` : seconds}
						</span>
					)}
				</div>
				<div>{minutes === 0 && seconds < 1 && !otpError && 'Timed out!!'}</div>
				{!invalidOTP ? (
					minutes === 0 &&
					seconds > 1 && (
						<span
							style={{
								// cursor: resendOTPcall > 0 ? 'no-drop' : 'pointer',
								color: resendOTPcall > 0 ? '#ff0000' : '#ff00007d',
								pointerEvents: resendOTPcall > 0 ? '' : 'none'
							}}
							onClick={handleResendOTP}
						>
							Resend OTP
						</span>
					)
				) : (
					<div>
						<span
							style={{
								color: '#ff0000'
							}}
						>
							Invalid Otp Entered
						</span>
					</div>
				)}
				{otpError && (
					<div>
						<span
							style={{
								color: '#ff0000'
							}}
						>
							{otpError}
						</span>
					</div>
				)}
			</div>

			<div style={{padding: '5px', textAlign: 'center'}}>
				<Button.Ripple
					color='warning'
					disabled={disabled || otpNumber.length !== 4 || validatingotp}
					onClick={handleContinue}
				>
					Verify OTP
				</Button.Ripple>{' '}
			</div>
		</>
	)
}
function mapStateToProps(state) {
	const {auth} = state
	const {phoneotp} = auth
	return {
		validatedotp: phoneotp?.validatedotp?.status?.toLowerCase(), //{status:'expired'}
		validatingotp: phoneotp?.validatingotp
	}
}
export default connect(mapStateToProps, {
	validateOTP,
	resendOTP
})(MobileInputLogin)
