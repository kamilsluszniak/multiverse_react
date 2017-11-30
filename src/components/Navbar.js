import React, { Component } from 'react'
import Login from './Login'
import Logout from './Logout'
import { loginUser, logoutUser, updateResources } from '../actions'
import {
  Route,
  Link
} from 'react-router-dom'
import PropTypes from 'prop-types'

export default class Navbar extends Component {

  render() {
    const { dispatch, isAuthenticated, errorMessage, email, planetName, metal, crystal, hydrogen, energy, planet} = this.props

    return (
      <nav className='navbar navbar-default'>
        <div className='container-fluid'>
          <div className="table">
            <a className="navbar-brand" href="#">MULTIVERSE</a>
            <div className='navbar-form'>
              <section className="press">
                {planet &&
                  <span>Planet {planet.name}</span>
                }


                {isAuthenticated &&
                  (<div><span>Logged in as {this.props.email}</span><Resources metal={metal} crystal={crystal} hydrogen={hydrogen} energy={energy}/></div>)
                }
                {isAuthenticated ? <Logout onLogoutClick={() => dispatch(logoutUser())} /> : <Link to={`/login`} className="login-button">Log in</Link>}

              </section>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

const Resources = (props) => {

  return (
    <div id="resources">
      <span id="metal">Metal: {Math.floor(props.metal)}</span>
      <span id="crystal"> Crystal: {Math.floor(props.crystal)}</span>
      <span id="hydrogen"> Hydrogen: {Math.floor(props.hydrogen)}</span>
      <span id="energy"> Energy: {Math.floor(props.energy)}</span>
    </div>
  )
}

Navbar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  email: PropTypes.string,
  planetName: PropTypes.string
}
