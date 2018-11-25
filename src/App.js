import React from 'react';
import { Route } from 'react-router-dom';
import Header from './Header';
import Login from './routes/Login';
import Logout from './routes/Logout';
import BookingForm from './routes/BookingForm';
import Dashboard from './routes/Dashboard';
import PrivateRoute from './hocs/PrivateRoute';

class App extends React.Component {
  render() {
    return (
      <>
        <Header />
        <main className="container py-3">
          <PrivateRoute exact path="/" component={Dashboard} />
          <PrivateRoute path="/buchung" exact component={BookingForm} />
          <PrivateRoute path="/buchung/:bookingId" component={BookingForm} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/logout" component={Logout} />
        </main>
      </>
    )
  }
}

export default App;