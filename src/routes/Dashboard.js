import React from 'react';
import UserContext from '../user-context';

class Dashboard extends React.Component {

  render() {
    return (
      <>
        <div>Let me tell you a secret!</div>
      </>
    );
  }
}

Dashboard.contextType = UserContext;

export default Dashboard;