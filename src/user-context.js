import React from 'react';
import axios from 'axios';

// initialize token and set up axios headers
const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

const UserContext = React.createContext();

export class UserProvider extends React.Component {
  state = {
    hasAuth: token !== null,
    setToken: token => {
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      this.setState({ hasAuth: true });
    },
    clearToken: () => {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    }
  }
  render() {
    return (
      <UserContext.Provider value={this.state}>
        {this.props.children}
      </UserContext.Provider>
    )
  }
}

export default UserContext;