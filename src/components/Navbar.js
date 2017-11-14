import React, { Component, PropTypes } from 'react'
import Login from './Login'
import Logout from './Logout'
import { loginUser, logoutUser, updateResources } from '../actions'
import {
  Route,
  Link
} from 'react-router-dom'

export default class Navbar extends Component {

  render() {
    const { dispatch, isAuthenticated, errorMessage, email, planetName, metal, crystal, hydrogen, energy } = this.props

    return (
      <nav className='navbar navbar-default'>
        <div className='container-fluid'>
          <div className="table">
            <a className="navbar-brand" href="#">MULTIVERSE</a>
            <div className='navbar-form'>
              <section className="press">
                {planetName &&
                  <span>Planet {this.props.planetName}</span>
                }


                {isAuthenticated &&
                  (<div><span>Logged in as {this.props.email}</span><Resources metal={metal} crystal={crystal} hydrogen={hydrogen} energy={energy}/><a onClick={() => dispatch(updateResources({id: 1}))}>resources</a></div>)
                }
                {console.log(planetName)}
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
