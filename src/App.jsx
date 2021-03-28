import AppBar from 'Components/AppBar';
import React, { lazy, memo, Suspense, useCallback, useEffect } from 'react';
import { Switch } from 'react-router';
import { useDispatch } from 'react-redux';
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

function App() {
  const dispatch = useDispatch();

  const onGetCurrentUser = useCallback(
    () => dispatch(authOperations.fetchCurrentUser()),
    [dispatch],
  );

  useEffect(() => {
    onGetCurrentUser();
  }, [onGetCurrentUser]);

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

export default memo(App);
