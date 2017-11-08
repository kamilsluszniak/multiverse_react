import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS,
  QUOTE_REQUEST, QUOTE_SUCCESS, QUOTE_FAILURE, UPDATE_RESOURCES,
  UPDATE_RESOURCES_SUCCESS, UPDATE_RESOURCES_FAILURE
} from './actions'

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
function auth(state = {
    isFetching: false,
    isAuthenticated: localStorage.getItem('access_token') ? true : false,
    email: localStorage.getItem('uid') || null
  }, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        user: action.creds
      })
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        errorMessage: '',
        email: action.email
      })
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
      })
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false
      })
    default:
      return state
  }
}

function app(state = {
    planetName: "",
    metal: 0,
    crystal: 0,
    energy: 0,
    hydrogen: 0
  }, action) {
  switch (action.type) {
    case UPDATE_RESOURCES:
      return Object.assign({}, state, {
        resourcesUpdating: true
      })
    case UPDATE_RESOURCES_SUCCESS:
    let response = JSON.parse(action.response)
      return Object.assign({}, state, {
        resourcesUpdating: false,
        planetName: response.name,
        metal: response.metal,
        crystal: response.crystal,
        energy: response.energy,
        hydrogen: response.hydrogen
      })
    default:
      return state
    }
}

// The quotes reducer
function quotes(state = {
    isFetching: false,
    quote: '',
    authenticated: false
  }, action) {
  switch (action.type) {
    case QUOTE_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case QUOTE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        quote: action.response,
        authenticated: action.authenticated || false
      })
    case QUOTE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      })
    default:
      return state
    }
}

// We combine the reducers here so that they
// can be left split apart above
const reducers = combineReducers({
  auth,
  app,
  quotes,
  routing: routerReducer
})

export default reducers
