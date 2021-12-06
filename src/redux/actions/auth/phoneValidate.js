import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:5000'

export const validatePhoneNumber = data => {
	// {
	//   countryCode: '91',
	//   phone: '4564564563'
	// }
	return async dispatch => {
		dispatch({type: 'VALIDATING_MOBILE_NUMBER'})
		await axios
			.post('/backendapi/otp/newuser/send', data)
			.then(response => {
				dispatch({type: 'VALIDATED_MOBILE_NUMBER', data: response.data})
			})
			.catch(err => {
				dispatch({type: 'INVALID_MOBILE_NUMBER', data: err?.response})
			})
	}
}
export const forgotpwd = body => {
	return async dispatch => {
		dispatch({type: 'REQUEST_CHANGE_PASSWORD'})
		await axios
			.post('/backendapi/user/changepassword', body, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('authtoken')}`
				}
			})
			.then(res => {
				res.data === 'ok' &&
					dispatch({
						type: 'RECEIVE_CHANGE_PASSWORD'
					})
			})
			.catch(err => {
				dispatch({
					type: 'FAILURE_CHANGE_PASSWORD'
				})
				console.log('error', err)
			})
	}
}
export const validateOTP = ({otp, key}) => {
	return async dispatch => {
		dispatch({type: 'VALIDATING_OTP'})
		await axios
			.post('/backendapi/otp/verify', {otp, key})
			.then(response => {
				dispatch({type: 'VALIDATED_OTP', data: response.data})
			})
			.catch(err => {
				dispatch({type: 'INVALID_OTP', data: err?.response})
			})
	}
}

export const resendOTP = (data, recoveryId) => {
	return async dispatch => {
		dispatch({type: 'VALIDATING_OTP'})
		await axios
			.post('/backendapi/otp/send', data)
			.then(response => {
				recoveryId &&
					dispatch({
						type: 'RECEIVE_RECOVERY_ID',
						data: {
							recoveryId,
							recoveryOtp: response.data
						}
					})
				dispatch({type: 'VALIDATED_OTP', data: response.data})
			})
			.catch(err => {
				dispatch({type: 'INVALID_OTP', data: err?.response})
				recoveryId &&
					dispatch({type: 'FAILURE_RECOVERY_ID', data: err?.response})
			})
	}
}

export const validateREcoveryID = data => {
	return async dispatch => {
		dispatch({type: 'REQUEST_RECOVERY_ID'})
		//axios.defaults.baseURL = 'http://localhost:5000'
		await axios
			.post('/backendapi/user/recovercheck', data, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('authtoken')}`
				}
			})
			.then(res => {
				const recoveryId = res?.data[0]
				dispatch(resendOTP(data, recoveryId))
			})
			.catch(err => {
				dispatch({type: 'FAILURE_RECOVERY_ID', data: err?.response})
			})
	}
}
