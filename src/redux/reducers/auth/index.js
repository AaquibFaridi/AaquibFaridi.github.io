import { combineReducers } from 'redux'
import { login } from './loginReducer'
import { register } from './registerReducers'
import { phoneotp } from './phoneValidate'

const authReducers = combineReducers({
  login,
  register,
  phoneotp
})

export default authReducers
