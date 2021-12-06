import axios from 'axios'
import {toast} from 'react-toastify'

const token = localStorage.getItem('authtoken')
export const getScheduledMessages = () => {
	const logInUserData = JSON.parse(localStorage.getItem('logInUserData'))
	if (!logInUserData) return
	const userData = localStorage.getItem('logInUserData')
		? JSON.parse(localStorage.getItem('logInUserData'))
		: {}
	return async dispatch => {
		dispatch({
			type: 'LOAD_MSG'
		})
		await axios
			.get(`/backendapi/sender/getlist/${userData._id}`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			.then(response => {
				// for (let data of response?.data) {
				//   data.nomineeId = data?.nomineeId && decryptdata(data.nomineeId, true)
				//   // data._id = data?._id && decryptdata(data._id,true)
				//   // data.userId = data?.userId && decryptdata(data.userId,true)
				//   data.name = data?.name && decryptdata(data.name, true)
				//   data.relation = data?.relation && decryptdata(data.relation, true)
				//   data.email = data?.email && decryptdata(data.email, true)
				//   data.primaryContact =
				//     data?.primaryContact && decryptdata(data.primaryContact, true)
				//   data.secondaryContact =
				//     data?.secondaryContact && decryptdata(data.secondaryContact, true)
				//   data.address = data?.address && decryptdata(data.address, true)
				// }
				dispatch({
					type: 'GET_MSG',
					getmesssages: response.data
				})
			})
			.catch(err => {
				dispatch({
					type: 'ERR_MSG'
				})
			})
	}
}

export const scheduleNewMessage = msg => {
	return dispatch => {
		const user = JSON.parse(localStorage.getItem('logInUserData'))._id
		msg.user = user
		axios
			.post('/backendapi/sender/schedulenew', msg, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			.then(response => {
				dispatch({type: 'ADD_MSG', getmesssages: msg})
				dispatch(getScheduledMessages())
				toast.success('Message Scheduled Successfully!!')
			})
			.catch(err => console.log(err))
	}
}

export const editMessage = msg => {
	return dispatch => {
		// const user = JSON.parse(localStorage.getItem('logInUserData'))._id
		// msg.user = user
		axios
			.post('/backendapi/sender/update', msg, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			.then(response => {
				dispatch({type: 'ADD_MSG', getmesssages: [msg]})
				dispatch(getScheduledMessages())
				toast.success('Message Updated Successfully!!')
			})
			.catch(err => console.log(err))
	}
}
