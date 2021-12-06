import React from 'react'
//import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { Disc, X, Circle } from 'react-feather'
import classnames from 'classnames'
import Logo from 'assets/img/logo/favrm.png'
import themeConfig from 'configs/themeConfig'
const SidebarHeader = (props) => {
  const {
    toggleSidebarMenu,
    activeTheme,
    collapsed,
    toggle,
    sidebarVisibility,
    menuShadow
  } = props

  return (
    <div className="navbar-header">
      <ul className="nav navbar-nav flex-row">
        <li className="nav-item mr-auto">
          <NavLink to="/dashboard" className="navbar-brand">
            <div
              className="brand-logo"
              style={{
                background: `url(${Logo})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain'
              }}
            />
            <h2
              className="brand-text mb-0"
              style={{
                color:
                  themeConfig.theme === 'dark'
                    ? '#ebeefd '
                    : '#757488 !important'
              }}
            >
              Last Arzi
            </h2>
          </NavLink>
        </li>
        <li className="nav-item nav-toggle">
          <div className="nav-link modern-nav-toggle">
            {collapsed === false ? (
              <Disc
                onClick={() => {
                  //toggleSidebarMenu(true)
                  toggle()
                }}
                className={classnames(
                  'toggle-icon icon-x d-none d-xl-block font-medium-4',
                  {
                    'text-primary': activeTheme === 'primary',
                    'text-success': activeTheme === 'success',
                    'text-danger': activeTheme === 'danger',
                    'text-info': activeTheme === 'info',
                    'text-warning': activeTheme === 'warning',
                    'text-dark': activeTheme === 'dark'
                  }
                )}
                size={20}
                data-tour="toggle-icon"
              />
            ) : (
              <Circle
                onClick={() => {
                  toggleSidebarMenu(false)
                  toggle()
                }}
                className={classnames(
                  'toggle-icon icon-x d-none d-xl-block font-medium-4',
                  {
                    'text-primary': activeTheme === 'primary',
                    'text-success': activeTheme === 'success',
                    'text-danger': activeTheme === 'danger',
                    'text-info': activeTheme === 'info',
                    'text-warning': activeTheme === 'warning',
                    'text-dark': activeTheme === 'dark'
                  }
                )}
                size={20}
              />
            )}
            <X
              onClick={sidebarVisibility}
              className={classnames(
                'toggle-icon icon-x d-block d-xl-none font-medium-4',
                {
                  'text-primary': activeTheme === 'primary',
                  'text-success': activeTheme === 'success',
                  'text-danger': activeTheme === 'danger',
                  'text-info': activeTheme === 'info',
                  'text-warning': activeTheme === 'warning',
                  'text-dark': activeTheme === 'dark'
                }
              )}
              size={20}
            />
          </div>
        </li>
      </ul>
      <div
        className={classnames('shadow-bottom', {
          'd-none': menuShadow === false
        })}
      />
    </div>
  )
}

// SidebarHeader.propTypes = {
//   toggleSidebarMenu: PropTypes.string,
//   activeTheme: PropTypes.string,
//   collapsed: PropTypes.string,
//   toggle: PropTypes.string,
//   sidebarVisibility: PropTypes.string,
//   menuShadow: PropTypes.string
// }
export default SidebarHeader
