import React, { Component, PropTypes } from 'react'
import {
  Route,
  Link
} from 'react-router-dom'
import { getPlanetsIndex } from '../actions'

export default class PlanetsIndex extends Component {

  componentDidMount() {

    this.props.dispatch(getPlanetsIndex())
  }

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
