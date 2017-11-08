import React, { Component, PropTypes } from 'react'
import {
  Route,
  Link
} from 'react-router-dom'

export default class PlanetsIndex extends Component {

  render() {
    const { dispatch } = this.props

    return (
        <div className='container-fluid'>
          <div className="table">
            <h1>Planets Indexx</h1>
          </div>
        </div>
    )
  }
}

PlanetsIndex.propTypes = {
  dispatch: PropTypes.func.isRequired
}
