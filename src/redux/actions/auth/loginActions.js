import { history } from 'utility/history'
import axios from 'axios'

export const loginWithJWT = (user) => {
  return (dispatch) => {
    axios
      .post('/api/authenticate/login/user', {
        email: user.email,
        password: user.password
      })
      .then((response) => {
        let loggedInUser
        if (response.data) {
          loggedInUser = response.data.user

          dispatch({
            type: 'LOGIN_WITH_JWT',
            payload: { loggedInUser, loggedInWith: 'jwt' }
          })

          history.push('/')
        }
      })
      .catch((err) => console.log(err))
  }
}

export const logoutWithJWT = () => {
  return (dispatch) => {
    dispatch({ type: 'LOGOUT_WITH_JWT', payload: {} })
    history.push('/pages/login')
  }
}

export const logoutWithFirebase = (user) => {
  return (dispatch) => {
    dispatch({ type: 'LOGOUT_WITH_FIREBASE', payload: {} })
    history.push('/pages/login')
  }
}

export const setSection = (data) => {
  return (dispatch) => {
    switch (data) {
      case 'download':
        dispatch({ type: 'OPEN_DOWNLOAD', payload: true })
        break
      case 'undownload':
        dispatch({ type: 'OPEN_DOWNLOAD', payload: false })
        break
      case 'plan':
        dispatch({ type: 'LOGIN_WITH_PLAN', payload: true })
        break
      case 'feature':
        dispatch({ type: 'LOGIN_WITH_FEATURE', payload: true })
        break
      case 'why':
        dispatch({ type: 'LOGIN_WITH_WHY', payload: true })
        break
      default:
        break
    }
  }
}

export const changeRole = (role) => {
  return (dispatch) => dispatch({ type: 'CHANGE_ROLE', userRole: role })
}
