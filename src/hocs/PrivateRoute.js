import React from 'react';
import GlobalContext from '../contexts/global-context';
import { Route, Redirect } from 'react-router-dom';

export default ({ component: Component, ...rest }) => {
  return (
    <GlobalContext.Consumer>
      {({ user: { hasAuth } }) => (
        <Route
          {...rest}
          render={props =>
            hasAuth ? (
              <Component {...props} />
            ) : (
                <Redirect
                  to={{
                    pathname: "/login",
                    state: { from: props.location }
                  }}
                />
              )
          }
        />
      )}
    </GlobalContext.Consumer>
  );
}