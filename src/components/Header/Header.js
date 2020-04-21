import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import TokenService from '../../services/token-service';
import { ReactComponent as FilterText } from './Assets/FILTER_TEXT.svg';
import { ReactComponent as FilterLogo } from '../../routes/HomePage/Assets/ICON.svg';

class Header extends Component {
  //if a user is logged in, this is what displays in NavBar
  renderLogoutLink = () => {
    return (
      <>
        <NavLink className="Links" to="/BeanList">
          All Beans
        </NavLink>
        <NavLink className="Links" to="/Account">
          Your Beans
        </NavLink>
        <NavLink className="Links" onClick={this.props.logoutClick} to="/">
          Logout
        </NavLink>
      </>
    );
  };
  //if a user is logged out, this is what displays in NavBar
  renderLoginLink = () => {
    return (
      <>
        <NavLink className="Links" to="/BeanList">
          All Beans
        </NavLink>
        <NavLink className="Links" to="/login">
          Log in
        </NavLink>
        <NavLink className="Links" to="/register">
          Register
        </NavLink>
      </>
    );
  };

  render() {
    return (
      <div className="headerWrapper">
        {/* <header className="header"> */}
        <NavLink to={'/'} className="nav-title">
          <FilterLogo className="logo" />
          <FilterText className="filterTextLogo" />
        </NavLink>
        {/* </header> */}
        <nav className="nav-bar">
          {/* hasAuthToken checks for log in or out state */}
          {TokenService.hasAuthToken()
            ? this.renderLogoutLink()
            : this.renderLoginLink()}
        </nav>
      </div>
    );
  }
}

export default Header;
