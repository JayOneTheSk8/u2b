import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const Auth = ({ component: Component, path, loggedIn, exact }) => {
  return (
    <Route
      path={path}
      exact={exact}
      render={props =>
        !loggedIn ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

const Protected = ({ component: Component, path, loggedIn, exact }) => {
  return (
    <Route
      path={path}
      exact={exact}
      render={props =>
        loggedIn ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

const Secured = ({ component: Component, path, matched, exact }) => {
  return (
    <Route
      path={path}
      exact={exact}
      render={props =>
        matched ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

const mapStateToProps = (state, ownProps) => {
  const userFromPath = ownProps.computedMatch.params.userId;
  const matched = userFromPath === `${state.session.currentUserId}`;
  return {
    loggedIn: Boolean(state.session.currentUserId),
    matched,
  };
};

export const AuthRoute = withRouter(
  connect(
    mapStateToProps,
    null
  )(Auth)
);

export const ProtectedRoute = withRouter(
  connect(
    mapStateToProps,
    null
  )(Protected)
);

export const SecuredRoute = withRouter(
  connect(
    mapStateToProps,
    null
  )(Secured)
);
