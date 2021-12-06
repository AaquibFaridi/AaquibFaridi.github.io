import React, { Suspense } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Spinner } from 'reactstrap'
import { ContextLayout } from 'utility/context/Layout'
// Set Layout and Component Using Private Route
const PrivateRoute = ({ component: Component, fullLayout, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const user1 = localStorage.getItem('logInUserData')
      const { location: { pathname = '' } = {} } = props
      const all =
        pathname?.includes('home') ||
        pathname?.includes('privacy') ||
        pathname?.includes('license') ||
        pathname?.includes('emailconfirmation') ||
        pathname?.includes('terms_conditions')
      if (user1 === null && !all) {
        return <Redirect to="/home" />
      }

      return (
        <ContextLayout.Consumer>
          {(context) => {
            const LayoutTag =
              fullLayout === true ? context.fullLayout : context.VerticalLayout
            return (
              <LayoutTag {...props} permission={props.user}>
                <Suspense fallback={<Spinner color="warning" size="lg" />}>
                  <Component {...props} />
                </Suspense>
              </LayoutTag>
            )
          }}
        </ContextLayout.Consumer>
      )
    }}
  />
)
const mapStateToProps = (state) => {
  return {
    user: state.auth.login.userRole
  }
}

export default connect(mapStateToProps)(PrivateRoute)
