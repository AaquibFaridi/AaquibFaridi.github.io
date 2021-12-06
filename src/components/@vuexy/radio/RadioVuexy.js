import React from 'react'
//import PropTypes from 'prop-types'
import classnames from 'classnames'
const RadioVuexy = (props) => {
  return (
    <div
      className={classnames(
        `vx-radio-con ${props.className} vx-radio-${props.color}`
      )}
    >
      <input
        type="radio"
        defaultChecked={props.defaultChecked}
        value={props.value}
        disabled={props.disabled}
        name={props.name}
        onClick={props.onClick}
        onChange={props.onChange}
        ref={props.ref}
        checked={props.checked}
      />
      <span
        className={classnames('vx-radio', {
          'vx-radio-sm': props.size === 'sm',
          'vx-radio-lg': props.size === 'lg'
        })}
      >
        <span className="vx-radio--border" />
        <span className="vx-radio--circle" />
      </span>
      <span>{props.label}</span>
    </div>
  )
}
export default RadioVuexy
