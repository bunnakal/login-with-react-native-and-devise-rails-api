import * as types from '../constants/ActionTypes'

const defaultOptions = {
  isFetching: false,
  isAuthenticated: false,
  modalVisible: false,
  transparent: false,
  animated: false
}

export default function auth(state = defaultOptions, action) {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        modalVisible: true,
        transparent: true,
        animated: true,
        user: action.creds
      })
    case types.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        modalVisible: false,
        transparent: false,
        animated: false,
        user: action.user,
        errorMessage: ''
      })
    case types.LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        modalVisible: false,
        transparent: false,
        animated: false,
        errorMessage: action.message
      })
    case types.LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: ''
      })
    case types.ALREADY_LOGIN:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        user: action.creds
      })
    case types.REQUIRE_LOGIN:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
      })
    case types.SESSION_TIMEOUT:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
      })
    default:
      return state
  }
}