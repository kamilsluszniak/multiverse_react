import React, { Component } from 'react'
import {
  Route,
  Link
} from 'react-router-dom'
import { getPlanetsIndex } from '../actions'
import Planets from '../components/Planets'
import PropTypes from 'prop-types'

export default class PlanetsIndex extends Component {

  componentDidMount() {

    this.props.dispatch(getPlanetsIndex())
  }

  render() {
    const { dispatch, planets } = this.props

    return (
        <div className='content'>
          <div className="table">
            <h1>Planets Indexx</h1>
            {planets && <Planets planets={planets} dispatch={dispatch}/>}
          </div>
        </div>
    )
  }
}

PlanetsIndex.propTypes = {
  dispatch: PropTypes.func.isRequired
}
