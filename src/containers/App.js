import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loginUser, fetchQuote, fetchSecretQuote } from '../actions'
import Login from '../components/Login'
import Navbar from '../components/Navbar'
import Quotes from '../components/Quotes'
import NavigationPanel from '../components/NavigationPanel'
import {
  Route,
  Link,
  Switch
} from 'react-router-dom'
import PlanetsIndex from '../containers/PlanetsIndex'


import '../App.css'

class App extends Component {
  render() {
    const { dispatch, quote, isAuthenticated, errorMessage, isSecretQuote, email, children, planetName } = this.props
    return (
      <div>
        <Navbar
          isAuthenticated={isAuthenticated}
          errorMessage={errorMessage}
          dispatch={dispatch}
          email={email}
          planetName={planetName}
        />
        <NavigationPanel/>
        <div className='main-container'>
          <main>
            <Route path="/planets" component={PlanetsIndex}/>

          </main>

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
  email: PropTypes.string,
  planetName: PropTypes.string
}

// These props come from the application's
// state when it is started
function mapStateToProps(state) {

  const { quotes, auth, children, app } = state
  const { quote, authenticated } = quotes
  const { isAuthenticated, errorMessage, email } = auth
  const { planetName } = app

  return {
    quote,
    isSecretQuote: authenticated,
    isAuthenticated,
    errorMessage,
    email,
    children,
    planetName
  }
}

export default connect(mapStateToProps)(App)
