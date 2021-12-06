import { combineReducers } from 'redux'
import todoReducer from './todo/'
import customizer from './customizer/'
import sender from './sender/'
import auth from './auth/'
import dataList from './data-list/'

const rootReducer = combineReducers({
  todoApp: todoReducer,
  customizer,
  sender,
  auth,
  dataList
})

export default rootReducer
