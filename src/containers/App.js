import React, { Component } from 'react'
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
import BuildingsIndex from '../containers/BuildingsIndex'
import PropTypes from 'prop-types'


import '../App.css'

class App extends Component {
  render() {
    const { dispatch, isAuthenticated, errorMessage, email, planetName, planetId, metal, crystal, hydrogen, energy, planets, planet, selected_object_name,
      selected_object_cost,
      selected_object_ready_at } = this.props

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
          planet={planet}
          metal={metal}
          crystal={crystal}
          hydrogen={hydrogen}
          energy={energy}
        />

        <div className='main-container'>
          <main>
            <NavigationPanel
              dispatch={dispatch}
            />
            <Route path="/planets" render={(props) => <PlanetsIndex {...props} dispatch={dispatch} planets={planets}/>}/>
            <Route path="/buildings" render={(props) => <BuildingsIndex {...props} dispatch={dispatch} planet={planet}/>}/>
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
  const { planetName, planetId, metal, crystal, hydrogen, energy, isAuthenticated, errorMessage, email,
    planets,selected_object_name, selected_object_cost, selected_object_ready_at } = app
  const planet = planets ? planets.find(e => e.id === planetId) : null

  return {
    isAuthenticated,
    errorMessage,
    email,
    planetName,
    planetId,
    metal,
    crystal,
    hydrogen,
    energy,
    planets,
    planetId,
    planet,
    selected_object_name,
    selected_object_cost,
    selected_object_ready_at
  }
}

export default connect(mapStateToProps)(App)
