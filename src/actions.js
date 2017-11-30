
import { CALL_API } from './middleware/api'
// There are three possible states for our login
// process and we need actions for each of them
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

// Three possible states for our logout process as well.
// Since we are using JWTs, we just need to remove the token
// from localStorage. These actions are more useful if we
// were calling the API to log the user out
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

export const UPDATE_RESOURCES_SUCCESS = 'UPDATE_RESOURCES_SUCCESS'
export const UPDATE_RESOURCES_FAILURE = 'UPDATE_RESOURCES_FAILURE'

export const GET_PLANETS_SUCCESS = 'GET_PLANETS_SUCCESS'
export const GET_PLANETS_FAILURE = 'GET_PLANETS_FAILURE'

export const PLANET_SELECT_SUCCESS = 'PLANET_SELECT_SUCCESS'
export const PLANET_SELECT_FAILURE = 'PLANET_SELECT_FAILURE'

export const SHOW_OBJECT_SUCCESS = 'SHOW_OBJECT_SUCCESS'
export const SHOW_OBJECT_FAILURE = 'SHOW_OBJECT_FAILURE'

function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  }
}

function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    email: user.data.email
  }
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  }
}

function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  }
}

export function updateResources(planet){
  return {
    [CALL_API]: {
      endpoint: `planets/${planet.id}/planet_info`,
      types: [UPDATE_RESOURCES_SUCCESS, UPDATE_RESOURCES_FAILURE]
    }
  }
}

export function selectPlanetAndUpdateResources(planet){
  return {
    [CALL_API]: {
      endpoint: `planets/${planet.id}/planet_info`,
      types: [PLANET_SELECT_SUCCESS, PLANET_SELECT_FAILURE]
    }
  }
}

export function getPlanetsIndex(){
  return {
    [CALL_API]: {
      endpoint: `planets`,
      types: [GET_PLANETS_SUCCESS, GET_PLANETS_FAILURE]
    }
  }
}

export function showObject(planetId, object){
  return {
    [CALL_API]: {
      endpoint: `show_object`,
      types: [SHOW_OBJECT_SUCCESS, SHOW_OBJECT_FAILURE]
    }
  }
}


// Calls the API to get a token and
// dispatches actions along the way
export function loginUser(creds) {

  let config = {
    method: 'POST',
    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
    body: `email=${creds.email}&password=${creds.password}`
  }

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds))

    return fetch('http://localhost:3001/auth/sign_in', config)
      .then(response =>
        response.json().then(user => ({ user, response }))
            ).then(({ user, response }) =>  {
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(loginError(user.error))
          return Promise.reject(user)
        } else {
          // If login was successful, set the token in local storage
          localStorage.setItem('access_token', response.headers.get('access-token'))
          localStorage.setItem('access_token_expire_at', response.headers.get('expiry'))
          localStorage.setItem('client', response.headers.get('client'))
          localStorage.setItem('uid', response.headers.get('uid'))
          // Dispatch the success action
          dispatch(receiveLogin(user))
        }
      }).catch(err => console.log("Error: ", err))
  }
}

// Logs the user out
export function logoutUser() {
  return dispatch => {
    dispatch(requestLogout())
    localStorage.removeItem('id_token')
    localStorage.removeItem('access_token')
    dispatch(receiveLogout())
  }
}
