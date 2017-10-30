import React, { Component, PropTypes } from 'react'
import {
  Route,
  Link
} from 'react-router-dom'

export default class PlanetsIndex extends Component {

  render() {
    const { dispatch } = this.props

    return (
      <nav className='container'>
        <div className='container-fluid'>
          <div className="table">
            <h1>Planets Indexx</h1>
          </div>
        </div>
      </nav>
    )
  }
}

PlanetsIndex.propTypes = {
  dispatch: PropTypes.func.isRequired
}
