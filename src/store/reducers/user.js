import {
    EDIT_USER_ERROR, EDIT_USER_SUCCESS,
    FETCH_USER_SUCCESS,
    FETCH_USERS_ERROR,
    FETCH_USERS_START,
    FETCH_USERS_SUCCESS
} from '../types/actionTypes';

const initialState = {
    users: [],
    loading: false,
    error: null,
    user: null
}

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_USERS_START:
            return {
                ...state, loading: true
            }
        case FETCH_USERS_SUCCESS:
            return {
                ...state, loading: false, users: action.users
            }
        case FETCH_USERS_ERROR:
            return {
                ...state, loading: false, error: action.error
            }
        case FETCH_USER_SUCCESS:
            return {
                ...state, loading: false, user: action.user
            }
        case EDIT_USER_ERROR:
            return {
                ...state, loading: false, error: action.error
            }
        case EDIT_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                users: state.user.map(user=> user.id === action.id ? {
                    ...user,
                    ...action.payload
                }:user)
            }


        default:
            return state
    }
}
