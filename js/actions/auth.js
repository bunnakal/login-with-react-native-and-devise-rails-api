import * as types from '../constants/ActionTypes'
import * as C from '../env';
import { AsyncStorage } from 'react-native';
import { parseResponse } from "../utils/handle-fetch-response";

function requestLogin(creds) {
  console.log('requestLogin :',creds)
  return {
    type: types.LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    modalVisible: true,
    transparent: true,
    animated: true,
    creds
  }
}

function receiveLogin(user) {
  console.log('receiveLogin :',user);
  return {
    type: types.LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    user: user
  }
}

function loginError(message) {
  console.log('Login Failure:',message);
  return {
    type: types.LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    modalVisible: false,
    transparent: false,
    animated: false,
    message
  }
}

function requestLogout(message) {
  return {
    type: types.LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  }
}

function receiveLogout(message) {
  return {
    type: types.LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

function alreadyLogin(creds) {
  console.log('alreadyLogin :', creds)
  return {
    type: types.ALREADY_LOGIN,
    isFetching: false,
    isAuthenticated: true,
    creds
  }
}

function requiredLogin(message) {
  console.log('requiredLogin :', message)
  return{
    type: types.REQUIRE_LOGIN,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

function sessionTimeOut(message) {
  return{
    type: types.SESSION_TIMEOUT,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

export function signOut() {
  console.log('signOut');
  return dispatch => {
    return removeStorageBySignout(dispatch)
  }
}

export function signIn(creds) {
  const API_ENDPOINT = 'http://locationcode.rotati.com/api/v1/auth/sign_in'
  let config = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(creds)
  }

  return dispatch => {
    dispatch(requestLogin(creds))

    return fetch(API_ENDPOINT, config)
    .then(function(res) {
      if(res.ok) {
        console.log(res.headers.get('uid'))
        let accessToken = res.headers.get('access-token');
        let client      = res.headers.get('client');
        let expiry      = res.headers.get('expiry');
        let tokenType   = res.headers.get('token-type');
        let uid         = res.headers.get('uid');
        let authHeader  = {'client': client, expiry: expiry, uid: uid, 'access-token': accessToken, 'token-type': tokenType}

        AsyncStorage.setItem('auth_header', JSON.stringify(authHeader))
      } else {
        return Promise.reject(res);
      }
      return res.json();
     })
    .then(function(resJson) {
      if(resJson.error) {
        dispatch(loginError(resJson.errors[0]))
      } else {
        AsyncStorage.setItem('user', JSON.stringify(resJson.data))
        dispatch(receiveLogin(resJson.data))
      }
    }).catch(function(error){
      setTimeout(() => {
        dispatch(loginError('Invalid login credentials. Please try again.'))
      }, 2000)
    })
  }
}

export function checkAuth() {
  return dispatch => {
    return AsyncStorage.getItem('auth_header', (err, result) => {
      console.log('checkAuth :',result)
      if(err === null && result !== null) {
        let authHeader = JSON.parse(result)
        let expiry = parseInt(authHeader.expiry, 10) * 1000;
        let currentDate = +new Date();
        validateToken(authHeader).then(response => {
          if(expiry <= currentDate) {
            removeStorage(dispatch)
          } else {
            AsyncStorage.getItem('user', (error, user) => {
              dispatch(alreadyLogin(JSON.parse(user)))
            })
          }
        }).catch(error => {
          if(expiry <= currentDate) {
            removeStorage(dispatch)
          } else {
            AsyncStorage.getItem('user', (error, user) => {
              dispatch(alreadyLogin(JSON.parse(user)))
            })
          }
        })
      }

      if(err !== null) {
        dispatch(requiredLogin('Login required'))
      }
    });
  }
}

export function validateToken(authHeader) {
  const API_ENDPOINT = 'http://locationcode.rotati.com/api/v1/auth/validate_token';
  let config = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'access-token': authHeader['access-token'],
      'expiry': authHeader['expiry'],
      'uid': authHeader['uid'],
      'token-type': authHeader['token-type'],
      'client': authHeader['client']
    }
  }
  console.log('validateToken')
  return fetch(API_ENDPOINT, config)
}

function removeStorage(dispatch) {
  let keys = ['auth_header', 'client'];
  AsyncStorage.multiRemove(keys, (err) => {
    dispatch(sessionTimeOut('Session Timeout'));
  });
}

function removeStorageBySignout(dispatch) {
  let keys = ['auth_header', 'client'];
  AsyncStorage.multiRemove(keys, (err) => {
    dispatch(receiveLogout('Logout Success'));
  });
}


