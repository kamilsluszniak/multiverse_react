import React, { Component } from 'react'
import {
  Route,
  Link
} from 'react-router-dom'
import { showObject } from '../actions'
import Buildings from '../components/Buildings'
import PropTypes from 'prop-types'

export default class BuildingsIndex extends Component {

  render() {
    const { dispatch, planet } = this.props

    return (
        <div className='content'>
          <div className="table">
            <h1>Buildings</h1>
            {planet && <Buildings planet={planet} dispatch={dispatch}/>}
          </div>
        </div>
    )
  }
}

BuildingsIndex.propTypes = {
  dispatch: PropTypes.func.isRequired
}
