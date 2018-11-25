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
      this.props.history.push('/');
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    return (
      <div className="row justify-content-center pt-5">
        <div className="col-lg-8">
          {this.renderForm()}
        </div>
      </div>
    );
  }

  renderForm() {
    return (
      <Form onSubmit={this.onSubmit}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Benutzername</label>
              <Field
                name="username"
                component="input"
                type="text"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Passwort</label>
              <Field
                name="password"
                component="input"
                type="password"
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
          </form>
        )}
      />
    )
  }
}

const WrappedLogin = withRouter(Login);
WrappedLogin.WrappedComponent.contextType = UserContext;

export default WrappedLogin;