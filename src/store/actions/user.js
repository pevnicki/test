import axios from '../../axios/axios-app'
import {
  EDIT_USER, EDIT_USER_ERROR, EDIT_USER_SUCCESS,
  FETCH_USER_SUCCESS,
  FETCH_USERS_ERROR,
  FETCH_USERS_START,
  FETCH_USERS_SUCCESS,
} from '../types/actionTypes'

export function fetchUsers() {
  return async dispatch => {
    dispatch(fetchUsersStart())
    try {
      const response = await axios.get('users')
      dispatch(fetchUsersSuccess(response.data))
    } catch (e) {
      dispatch(fetchUserError(e))
    }
  }
}

export function fetchUserById(id) {
  return async dispatch => {
    dispatch(fetchUsersStart())
    try {
      const response = await axios.get(`users/${id}`)
      dispatch(fetchUserSuccess(response.data))
    } catch (e) {
      dispatch(fetchUserError(e))
    }
  }
}


export function editUserById(user) {
  console.log(user)
  return async dispatch => {
    try {
      await axios.post(`users/${user.id}`,user)
      dispatch(editUserSuccess(user))
    } catch (e) {
      dispatch(userEditError(e))
    }
  }
}


export function fetchUserSuccess(user) {
  return {
    type: FETCH_USER_SUCCESS,
    user
  }
}

export function fetchUsersStart() {
  return {
    type: FETCH_USERS_START
  }
}

export function fetchUsersSuccess(users) {
  return {
    type: FETCH_USERS_SUCCESS,
    users
  }
}

export  function  editUserSuccess(user){
  return{
    type:EDIT_USER_SUCCESS,
    user
  }
}

export function fetchUserError(e) {
  return {
    type: FETCH_USERS_ERROR,
    error: e
  }
}

export function userEditError(e) {
  return {
    type: EDIT_USER_ERROR,
    error: e
  }
}



