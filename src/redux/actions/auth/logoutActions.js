import { history } from 'utility/history'
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
