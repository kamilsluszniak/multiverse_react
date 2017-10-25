import React, { Component, PropTypes } from 'react'
import Login from '../components/Login'
import { loginUser } from '../actions'
import { connect } from 'react-redux'

class LoginPage extends Component {

  render() {
    const { dispatch, errorMessage } = this.props

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

  const { auth } = state
  const { isAuthenticated, errorMessage } = auth

  return {
    isAuthenticated,
    errorMessage
  }
}

export default connect(mapStateToProps)(LoginPage)
