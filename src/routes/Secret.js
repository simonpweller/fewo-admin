import React from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../user-context';

class Secret extends React.Component {

  render() {
    return (
      <>
        <div>Let me tell you a secret!</div>
        <Link to="/logout">Logout</Link>
      </>
    );
  }
}

Secret.contextType = UserContext;

export default Secret;