import React, { Component, PropTypes } from 'react'
import '../App.css'

export default class Logout extends Component {

  render() {
    const { onLogoutClick } = this.props

    return (
      <button onClick={() => onLogoutClick()} className="btn btn-primary logout-button">
        Logout
      </button>
    )
  }

}

Logout.propTypes = {
  onLogoutClick: PropTypes.func.isRequired
}
