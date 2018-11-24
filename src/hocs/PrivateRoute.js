import React from 'react';
import UserContext from '../user-context';
import { Route, Redirect } from 'react-router-dom';

export default ({ component: Component, ...rest }) => {
  return (
    <UserContext.Consumer>
      {({ hasAuth }) => (
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
    </UserContext.Consumer>
  );
}