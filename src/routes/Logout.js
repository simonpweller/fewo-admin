import React from 'react';
import { withRouter } from 'react-router-dom';
import UserContext from '../user-context';

class Logout extends React.Component {
  componentDidMount() {
    this.context.clearToken();
    this.props.history.push('/login');
  }

  render() {
    return null;
  }
}

const WrappedLogout = withRouter(Logout);
WrappedLogout.WrappedComponent.contextType = UserContext;

export default WrappedLogout;