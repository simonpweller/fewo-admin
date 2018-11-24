import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import UserContext from '../user-context';

class Login extends React.Component {

  onSubmit = async ({ username, password }) => {
    try {
      const { data: { token } } = await axios.post('http://localhost:8081/signin', {
        username,
        password
      });
      this.context.setToken(token);
      this.props.history.push('/secret');
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    return (
      <Form onSubmit={this.onSubmit}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <fieldset>
              <label htmlFor="username">Benutzername</label>
              <Field
                name="username"
                component="input"
                type="text"
              />
            </fieldset>
            <fieldset>
              <label htmlFor="password">Passwort</label>
              <Field
                name="password"
                component="input"
                type="password"
              />
            </fieldset>
            <button type="submit">Login</button>
          </form>
        )}
      />
    );
  }
}

const WrappedLogin = withRouter(Login);
WrappedLogin.WrappedComponent.contextType = UserContext;

export default WrappedLogin;