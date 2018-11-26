import React from 'react';
import { Link } from 'react-router-dom';
import GlobalContext from './contexts/global-context';

class Header extends React.Component {
  render() {
    return (
      <header className="navbar navbar-dark bg-dark">
        <div className="container">
          <Link to="/" className="navbar-brand">
            Buchungsverwaltung
          </Link>
          <nav className="navbar-nav ml-auto">

            <Link to={`/${this.context.user.hasAuth ? 'logout' : 'login'}`} className="nav-link">
              <i className={`fas fa-${this.context.user.hasAuth ? 'sign-out' : 'sign-in'}-alt`}></i>
              <span className="pl-2">{this.context.user.hasAuth ? 'Logout' : 'Login'}</span>
            </Link>
          </nav>
        </div>
      </header>
    );
  }
}

Header.contextType = GlobalContext;

export default Header;