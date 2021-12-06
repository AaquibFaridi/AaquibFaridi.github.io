import React from 'react'
//import PropTypes from 'prop-types'
import logo from 'assets/img/logo/favrm.png'
import 'assets/scss/components/app-loader.scss'
const SpinnerComponent = (props) => {
  return (
    <div className="fallback-spinner vh-100">
      <img className="fallback-logo" src={logo} alt="logo" />
      <div className="loading">
        <div className="effect-1 effects"></div>
        <div className="effect-2 effects"></div>
        <div className="effect-3 effects"></div>
      </div>
    </div>
  )
}

export default SpinnerComponent
