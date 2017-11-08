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
    const { dispatch, isAuthenticated, errorMessage, email, planetName } = this.props

    return (
      <nav className='navbar navbar-default'>
        <div className='container-fluid'>
          <div className="table">
            <a className="navbar-brand" href="#">MULTIVERSE</a>
            <div className='navbar-form'>
              <section className="press">

                {isAuthenticated &&
                  (<div><span>Logged in as {this.props.email}</span><a onClick={() => dispatch(updateResources({id: 1}))}>resources</a></div>)
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

Navbar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  email: PropTypes.string,
  planetName: PropTypes.string
}
