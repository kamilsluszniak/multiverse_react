import React, { Component, PropTypes } from 'react'
import {
  Route,
  Link
} from 'react-router-dom'
import { getPlanetsIndex } from '../actions'
import Planets from '../components/Planets'

export default class PlanetsIndex extends Component {

  componentDidMount() {

    this.props.dispatch(getPlanetsIndex())
  }

  render() {
    const { dispatch, planets } = this.props

    return (
        <div className='container-fluid'>
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
