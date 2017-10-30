import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loginUser, fetchQuote, fetchSecretQuote } from '../actions'
import Login from '../components/Login'
import Navbar from '../components/Navbar'
import Quotes from '../components/Quotes'
import NavigationPanel from '../components/NavigationPanel'

import '../App.css'

class App extends Component {
  render() {
    const { dispatch, quote, isAuthenticated, errorMessage, isSecretQuote, email, children } = this.props
    return (
      <div>
        <Navbar
          isAuthenticated={isAuthenticated}
          errorMessage={errorMessage}
          dispatch={dispatch}
          email={email}
        />
        <NavigationPanel/>
        <div className='container'>
          <main>{this.props.children}</main>

        </div>
      </div>
    )
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  quote: PropTypes.string,
  isAuthenticated: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  isSecretQuote: PropTypes.bool.isRequired,
  email: PropTypes.string
}

// These props come from the application's
// state when it is started
function mapStateToProps(state) {

  const { quotes, auth, children } = state
  const { quote, authenticated } = quotes
  const { isAuthenticated, errorMessage, email } = auth

  return {
    quote,
    isSecretQuote: authenticated,
    isAuthenticated,
    errorMessage,
    email,
    children
  }
}

export default connect(mapStateToProps)(App)
