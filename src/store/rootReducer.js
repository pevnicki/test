import {combineReducers} from 'redux'
import userReducer from './reducers/user'
import authReducer from './reducers/auth'

export default combineReducers({
  user: userReducer,
  auth: authReducer
})
