import React from 'react'
//import PropTypes from 'prop-types'

import { ArrowUp } from 'react-feather'
import classnames from 'classnames'
import './footer.css'
const Footer = (props) => {
  let footerTypeArr = ['sticky', 'static', 'hidden']
  window.onscroll = function () {
    scrollFunction()
  }

  const button = document.getElementById('myBtn')

  const scrollFunction = () => {
    if (button) {
      if (
        document.body.scrollTop > 300 ||
        document.documentElement.scrollTop > 300
      ) {
        button.style.display = 'block'
      } else {
        button.style.display = 'none'
      }
    }
  }

  // When the user clicks on the button, scroll to the top of the document
  const topFunction = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer
      className={classnames('footer footer-light', {
        'footer-static':
          props.footerType === 'static' ||
          !footerTypeArr.includes(props.footerType),
        'd-none': props.footerType === 'hidden'
      })}
    >
      <div id="myBtn" className="scroll-top" onClick={() => topFunction()}>
        <ArrowUp
          size={40}
          color="white"
          style={{ backgroundColor: '#7f7e91', borderRadius: '30px' }}
        />
      </div>
    </footer>
  )
}

export default Footer
