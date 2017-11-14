import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS, UPDATE_RESOURCES,
  UPDATE_RESOURCES_SUCCESS, UPDATE_RESOURCES_FAILURE, GET_PLANETS, GET_PLANETS_SUCCESS, GET_PLANETS_FAILURE
} from './actions'

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.


function app(state = {
    planetName: "",
    planetId: null,
    metal: 0,
    crystal: 0,
    energy: 0,
    hydrogen: 0,
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
    case UPDATE_RESOURCES:
      return Object.assign({}, state, {
        resourcesUpdating: true
      })
    case UPDATE_RESOURCES_SUCCESS:
      var response = JSON.parse(action.response)
      return Object.assign({}, state, {
        resourcesUpdating: false,
        planetName: response.name,
        metal: response.metal,
        crystal: response.crystal,
        energy: response.energy,
        hydrogen: response.hydrogen
      })
    case GET_PLANETS_SUCCESS:
      var response = JSON.parse(action.response)
      console.log(response)
      return Object.assign({}, state, {
        resourcesUpdating: false,
        planetName: response.name

      })
    case GET_PLANETS_FAILURE:
      console.log(action.error)
      return Object.assign({}, state, {
        isAuthenticated: false

      })
    default:
      return state
    }
}

// We combine the reducers here so that they
// can be left split apart above
const reducers = combineReducers({
  app,
  routing: routerReducer
})

export default reducers
