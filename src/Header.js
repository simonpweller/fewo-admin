import React from 'react';
import { Link } from 'react-router-dom';
import UserContext from './user-context';

class Header extends React.Component {
  render() {
    return (
      <header className="navbar navbar-dark bg-dark">
        <div className="container">
          <Link to="/" className="navbar-brand">
            Buchungsverwaltung
          </Link>
          <nav className="navbar-nav ml-auto">

            <Link to={`/${this.context.hasAuth ? 'logout' : 'login'}`} className="nav-link">
              <i className={`fas fa-${this.context.hasAuth ? 'sign-out' : 'sign-in'}-alt`}></i>
              <span className="pl-2">{this.context.hasAuth ? 'Logout' : 'Login'}</span>
            </Link>
          </nav>
        </div>
      </header>
    );
  }
}

Header.contextType = UserContext;

export default Header;