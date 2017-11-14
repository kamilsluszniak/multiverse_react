import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../actions'
import Login from '../components/Login'
import Navbar from '../components/Navbar'
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
    const { dispatch, isAuthenticated, errorMessage, email, planetName, planetId, metal, crystal, hydrogen, energy } = this.props

    if (!isAuthenticated) {
      this.props.history.push('/login')
    }

    return (
      <div>
        <Navbar
          isAuthenticated={isAuthenticated}
          errorMessage={errorMessage}
          dispatch={dispatch}
          email={email}
          planetName={planetName}
          metal={metal}
          crystal={crystal}
          hydrogen={hydrogen}
          energy={energy}
        />
        <NavigationPanel/>
        <div className='main-container'>
          <main>
            <Route path="/planets" render={(props) => <PlanetsIndex {...props} dispatch={dispatch}/>}/>

          </main>

        </div>
      </div>
    )
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  email: PropTypes.string,
  planetName: PropTypes.string
}

// These props come from the application's
// state when it is started
function mapStateToProps(state) {

  const { app } = state
  const { planetName, planetId, metal, crystal, hydrogen, energy, isAuthenticated, errorMessage, email } = app

  return {
    isAuthenticated,
    errorMessage,
    email,
    planetName,
    planetId,
    metal,
    crystal,
    hydrogen,
    energy
  }
}

export default connect(mapStateToProps)(App)
