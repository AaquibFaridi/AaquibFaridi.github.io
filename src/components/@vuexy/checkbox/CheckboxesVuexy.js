import React from 'react'
//import PropTypes from 'prop-types'
const CheckBoxesVuexy = (props) => {
  return (
    <div
      className={`vx-checkbox-con ${
        props.className ? props.className : ''
      } vx-checkbox-${props.color}`}
    >
      <input
        type="checkbox"
        defaultChecked={props.defaultChecked}
        checked={props.checked}
        value={props.value}
        disabled={props.disabled}
        onClick={props.onClick ? props.onClick : null}
        onChange={props.onChange ? props.onChange : null}
      />
      <span
        className={`vx-checkbox vx-checkbox-${props.size ? props.size : 'md'}`}
      >
        <span className="vx-checkbox--check">{props.icon}</span>
      </span>
      <span style={{ color: props.labelColor }}>{props.label}</span>
    </div>
  )
}

export default CheckBoxesVuexy
