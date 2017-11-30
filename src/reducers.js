import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS, PLANET_SELECT_SUCCESS, PLANET_SELECT_FAILURE,
  UPDATE_RESOURCES_SUCCESS, UPDATE_RESOURCES_FAILURE, GET_PLANETS, GET_PLANETS_SUCCESS, GET_PLANETS_FAILURE,
  PLANET_SELECT, SHOW_OBJECT_SUCCESS, SHOW_OBJECT_FAILURE
} from './actions'



function app(state = {
    planetName: "",
    planetId: null,
    metal: 0,
    crystal: 0,
    energy: 0,
    hydrogen: 0,
    isFetching: false,
    isAuthenticated: localStorage.getItem('access_token') ? true : false,
    email: localStorage.getItem('uid') || null,
    planets: null,
    metal_lvl: null,
    crystal_lvl: null,
    hydrogen_lvl: null,
    solar_lvl: null,
    metal_rdy_at: null,
    crystal_rdy_at: null,
    hydrogen_rdy_at: null,
    solar_rdy_at: null,
    selected_object_name: null,
    selected_object_cost: null,
    selected_object_ready_at: null
  }, action) {
  var response = null
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
    case UPDATE_RESOURCES_SUCCESS:
      response = JSON.parse(action.response)
      console.log(response)
      return Object.assign({}, state, {
        resourcesUpdating: false,
        planetName: response.name,
        metal: response.metal,
        crystal: response.crystal,
        energy: response.energy,
        hydrogen: response.hydrogen,
        planetId: response.id
      })
    case GET_PLANETS_SUCCESS:
      response = JSON.parse(action.response)
      return Object.assign({}, state, {
        resourcesUpdating: false,
        planets: response

      })
    case GET_PLANETS_FAILURE:
      console.log(action.error)
      return Object.assign({}, state, {
        isAuthenticated: false

      })
    case PLANET_SELECT_SUCCESS:
      response = JSON.parse(action.response)
      console.log(response)
      return Object.assign({}, state, {
        resourcesUpdating: false,
        planetName: response.name,
        metal: response.metal,
        crystal: response.crystal,
        energy: response.energy,
        hydrogen: response.hydrogen,
        planetId: response.id,
        metal_lvl: response.metal_lvl,
        crystal_lvl: response.crystal_lvl,
        hydrogen_lvl: response.hydrogen_lvl,
        solar_lvl: response.solar_lvl,
        metal_rdy_at: response.metal_rdy_at,
        crystal_rdy_at: response.crystal_rdy_at,
        hydrogen_rdy_at: response.hydrogen_rdy_at,
        solar_rdy_at: response.solar_rdy_at
      })
    case SHOW_OBJECT_SUCCESS:
      response = JSON.parse(action.response)
      console.log(response)
      return Object.assign({}, state, {
        selected_object_name: response.name,
        selected_object_cost: response.cost,
        selected_object_ready_at: response.time
      })
    case SHOW_OBJECT_FAILURE:
    return Object.assign({}, state, {

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
