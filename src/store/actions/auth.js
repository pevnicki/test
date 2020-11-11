import axios from '../../axios/axios-app'
import {AUTH_LOGOUT, AUTH_SUCCESS} from '../types/actionTypes';

export function auth(email, password, name,lastName) {
  return async dispatch => {
    const authData = {
      email, name,lastName,password
    }
    const response = await axios.post('login', authData)

    localStorage.setItem('token', response.data.token)
    localStorage.setItem('userId', response.data.token)
    localStorage.setItem('expirationDate', new Date(new Date().getTime() + 10000 * 1000))

    dispatch(authSuccess(response.data.token))
  }
}

export function autoLogout(time) {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout())
    }, time * 10000000)
  }
}

export function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  localStorage.removeItem('expirationDate')
  return {
    type: AUTH_LOGOUT
  }
}


export function autoLogin() {
  return dispatch => {
    const token = localStorage.getItem('token')
    if (!token) {
      dispatch(logout())
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'))
      if (expirationDate <= new Date()) {
        dispatch(logout())
      } else {
        dispatch(authSuccess(token))
        dispatch(autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000))
      }
    }
  }
}

export function authSuccess(token) {
  return {
    type: AUTH_SUCCESS,
    token
  }
}
