import React from 'react';
import { Route } from 'react-router-dom';
import Login from './routes/Login';
import Logout from './routes/Logout';
import Secret from './routes/Secret';
import PrivateRoute from './hocs/PrivateRoute';

class App extends React.Component {
  render() {
    return (
      <>
        <h1>Ferienwohnung Admin-Interface</h1>
        <Route exact path="/login" component={Login} />
        <Route exact path="/logout" component={Logout} />
        <PrivateRoute exact path="/secret" component={Secret} />
      </>
    )
  }
}

export default App;