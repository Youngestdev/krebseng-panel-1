import React from 'react';
import auth0Client from '../Auth';

function NavBarProfile() {
  return (
    <ul className="navbar-nav justify-content-end" style={{width: '100%'}}>
      <li className="nav-item">
        <div className="nav-link">{auth0Client.getProfile().name}</div>
      </li>
      <li className="nav-item">
        <a onClick={auth0Client.signOut} className="nav-link">Sair</a>
      </li>
    </ul>
  );
}

function NavBar() {
  return (
    <nav className="navbar navbar-expand-sm bg-light navbar-light">
      <span className="navbar-brand mb-0 h1">Krebs Engenharia</span>
      {auth0Client.isAuthenticated() && NavBarProfile()}
    </nav>
  );
}

export default NavBar;
