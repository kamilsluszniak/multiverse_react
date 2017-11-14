import React, { Component, PropTypes } from 'react'
import Login from '../components/Login'
import { loginUser } from '../actions'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class LoginPage extends Component {

  render() {
    const { dispatch, errorMessage, isAuthenticated } = this.props

    if (isAuthenticated) {
      this.props.history.push('/')
    }

    return (
      <nav className='navbar navbar-default'>
        <div className='container-fluid'>
          <a className="navbar-brand" href="#">Login Page</a>
          <div className='navbar-form'>
            <h1>Login Page!</h1>
            <Login
              errorMessage={errorMessage}
              onLoginClick={ creds => dispatch(loginUser(creds)) }
            />

          </div>
        </div>
      </nav>
    )
  }

}

LoginPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string
}

function mapStateToProps(state) {

  const { app, history } = state
  const { isAuthenticated, errorMessage } = app

  return {
    isAuthenticated,
    errorMessage
  }
}

export default withRouter(connect(mapStateToProps)(LoginPage))
