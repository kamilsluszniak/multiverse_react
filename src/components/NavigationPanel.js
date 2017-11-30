import React, { Component } from 'react'
import {
  Route,
  Link
} from 'react-router-dom'
import PropTypes from 'prop-types'

export default class NavigationPanel extends Component {

  render() {
    const { dispatch } = this.props

    return (
      <nav className='navbar navigation-panel'>
        <Link to={`/planets`} className="navigation-button">Planets</Link>
        <Link to={`/buildings`} className="navigation-button">Buildings</Link>
        <Link to={`/research`} className="navigation-button">Research</Link>
        <Link to={`/shipyard`} className="navigation-button">Shipyard</Link>
        <Link to={`/defense`} className="navigation-button">Defense</Link>
      </nav>
    )
  }
}

NavigationPanel.propTypes = {
  dispatch: PropTypes.func.isRequired
}
