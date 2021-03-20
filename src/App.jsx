import AppBar from 'Components/AppBar';
import React, { Component, lazy, Suspense } from 'react';
import { Switch } from 'react-router';
import { connect } from 'react-redux';
import { authOperations } from 'redux/auth';
import PrivateRoute from 'Components/PrivateRoute';
import PublicRoute from 'Components/PublicRoute';

const LazyHomeView = lazy(() =>
  import('./views/HomeView/HomeView' /* webpackChunkName "home-page"*/),
);
const LazyContactsView = lazy(() =>
  import(
    './views/ContactsView/ContactsView' /* webpackChunkName "contact-page"*/
  ),
);
const LazyRegisterView = lazy(() =>
  import(
    './views/RegisterView/RegisterView' /* webpackChunkName "register-page"*/
  ),
);
const LazyLoginView = lazy(() =>
  import('./views/LoginView/LoginView' /* webpackChunkName "login-page"*/),
);

class App extends Component {
  componentDidMount() {
    this.props.onGetCurrentUser();
  }

  render() {
    return (
      <>
        <AppBar />
        <Suspense fallback={<p>Loading... Please waite</p>}>
          <Switch>
            <PublicRoute exact path="/" component={LazyHomeView} />
            <PublicRoute
              path="/register"
              restricted
              redirectTo="/contacts"
              component={LazyRegisterView}
            />
            <PublicRoute
              path="/login"
              restricted
              redirectTo="/contacts"
              component={LazyLoginView}
            />
            <PrivateRoute
              path="/contacts"
              redirectTo="/login"
              component={LazyContactsView}
            />
          </Switch>
        </Suspense>
      </>
    );
  }
}

const mapDispatchToProps = {
  onGetCurrentUser: authOperations.fetchCurrentUser,
};

export default connect(null, mapDispatchToProps)(App);
