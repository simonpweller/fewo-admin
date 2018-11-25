import React from 'react';
import { withRouter } from 'react-router-dom';
import GlobalContext from '../contexts/global-context';

class Logout extends React.Component {
  componentDidMount() {
    this.context.user.clearToken();
    this.props.history.push('/login');
  }

  render() {
    return null;
  }
}

const WrappedLogout = withRouter(Logout);
WrappedLogout.WrappedComponent.contextType = GlobalContext;

export default WrappedLogout;