import currentUser from './currentUser'
import simpleAction from './simpleAction'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  currentUser,
  simpleAction
})

export default rootReducer
