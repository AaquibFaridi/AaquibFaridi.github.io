import React from 'react'
import { Switch, Redirect, HashRouter } from 'react-router-dom'
import PrivateRoute from 'routes/RouterConfig'
import {
  Dashboard,
  NomineeList,
  Spends,
  Vault,
  PwdVault as PasswordVault,
  License,
  Diary,
  MailConfirm,
  Portfolio,
  Sender,
  Privacy,
  Terms_C,
  AddLiability,
  UpdateProfile,
  Subscription,
  home,
  AddAssets
} from 'routes/genericImport'
const AppRouter = (props) => {
  return (
    // Set the directory path if you are deploying in sub-folder
    <HashRouter basename="/#">
      <Switch>
        <PrivateRoute path="/terms_conditions" component={Terms_C} />
        <PrivateRoute path="/license" component={License} />
        <PrivateRoute path="/privacy" component={Privacy} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/nominee/list" component={NomineeList} />
        <PrivateRoute path="/spends" component={Spends} />
        <PrivateRoute path="/assets/add" component={AddAssets} />
        <PrivateRoute path="/vault/document" component={Vault} />
        <PrivateRoute path="/vault/password" component={PasswordVault} />
        <PrivateRoute
          path="/emailconfirmation/:userkey"
          component={MailConfirm}
          fullLayout
        />
        <PrivateRoute path="/diary" component={Diary} />
        <PrivateRoute path="/diary/:filter" component={Diary} />
        <PrivateRoute
          path="/diary"
          exact
          component={() => <Redirect to="/diary" />}
        />
        <PrivateRoute path="/portfolio" component={Portfolio} />
        <PrivateRoute path="/contactUs" component={Sender} />
        <PrivateRoute path="/liability/add" component={AddLiability} />
        <PrivateRoute
          exact
          path="/user/profile"
          component={(props) => <UpdateProfile {...props} />}
        />
        <PrivateRoute
          exact
          path="/user/feed"
          component={(props) => <UpdateProfile {...props} />}
        />
        <PrivateRoute
          exact
          path="/user/notify"
          component={(props) => <UpdateProfile {...props} />}
        />
        <PrivateRoute
          exact
          path="/user/upgrade"
          component={(props) => <UpdateProfile {...props} />}
        />
        <PrivateRoute
          path="/pages/subscription"
          component={Subscription}
          fullLayout
        />
        <PrivateRoute path="/home" component={home} />
        <PrivateRoute path="/home/session" component={home} />
        <PrivateRoute path="/" component={home} />
      </Switch>
    </HashRouter>
  )
}

export default AppRouter
