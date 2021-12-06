import axios from 'axios'
import {history} from 'utility/history'
import {toast} from 'react-toastify'

const token = localStorage.getItem('authtoken')
export const getTodos = routeParams => {
	const logInUserData = JSON.parse(localStorage.getItem('logInUserData'))
	if (!logInUserData) return
	const userData = localStorage.getItem('logInUserData')
		? JSON.parse(localStorage.getItem('logInUserData'))
		: {}
	return async dispatch => {
		await axios
			.get(`backendapi/diary/list?user=${userData._id}`, {
				params: routeParams,
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
					type: 'GET_TODOS',
					todos: response.data,
					routeParams
				})
			})
			.catch(err => console.log(err))
	}
}
export const completeTask = todo => {
	return dispatch => {
		dispatch({type: 'COMPLETE_TASK', id: todo.id, value: todo.isCompleted})
	}
}

export const starTask = todo => {
	return dispatch => {
		Promise.all([
			dispatch({type: 'STAR_TASK', id: todo.id, value: todo.isStarred})
		])
	}
}

export const importantTask = todo => {
	return dispatch => {
		Promise.all([
			dispatch({type: 'IMPORTANT_TASK', id: todo.id, value: todo.isImportant})
		])
	}
}

export const trashTask = id => {
	return (dispatch, getState) => {
		const params = getState().todoApp.todo.routeParam
		axios
			.post('/api/app/todo/trash-todo', id, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			.then(response => dispatch({type: 'TRASH_TASK', id}))
			.then(dispatch(getTodos(params)))
	}
}

export const updateTodo = todo => {
	const request = axios.post('/api/apps/todo/update-todo', todo, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	})
	return (dispatch, getState) => {
		const params = getState().todoApp.todo.routeParam
		request.then(response => {
			Promise.all([
				dispatch({
					type: 'UPDATE_TODO',
					todos: response.data
				})
			]).then(() => dispatch(getTodos(params)))
		})
	}
}

export const updateTask = (
	id,
	title,
	desc,
	taskToUpdate,
	isCompleted,
	isImportant,
	isStarred,
	tags
) => {
	const ans = {
		_id: id,
		title,
		desc,
		taskToUpdate,
		isCompleted,
		isImportant,
		isStarred,
		tags
	}
	const request = axios.post('/backendapi/diary/update', ans, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	})
	return (dispatch, getState) => {
		const params = getState().todoApp.todo.routeParam
		request.then(response => {
			Promise.all([
				dispatch({
					type: 'UPDATE_TASK',
					ans
					// todos: response.data
				})
			]).then(() => dispatch(getTodos(params)))
		})
	}
}

export const updateLabel = (id, label) => {
	return (dispatch, getState) => {
		dispatch({type: 'UPDATE_LABEL', label, id})
	}
}

export const addNewTask = task => {
	return (dispatch, getState) => {
		const params = getState().todoApp.todo.routeParam
		const user = JSON.parse(localStorage.getItem('logInUserData'))._id
		task.user = user
		axios
			.post('/backendapi/diary/add', task, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			.then(response => {
				dispatch({type: 'ADD_TASK', task})
				dispatch(getTodos(params))
				toast.success('Note Added Successfully!!')
			})
	}
}

export const searchTask = val => {
	return dispatch => {
		dispatch({
			type: 'SEARCH_TASK',
			val
		})
	}
}

export const changeFilter = filter => {
	return dispatch => {
		dispatch({type: 'CHANGE_FILTER', filter})
		history.push(`/#/diary/${filter}`)
		dispatch(getTodos({filter}))
	}
}
