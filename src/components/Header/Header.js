import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import './Header.css'
import TokenService from '../../services/token-service'

class Header extends Component {


  renderLogoutLink = () => {

    return (
      <>
        <NavLink className='Links'
          to='/BeanList'>
          All Beans
        </NavLink>
        <NavLink className='Links'
          to='/Account'>
          Your Beans
        </NavLink>
        <NavLink className='Links'
          onClick={this.props.logoutClick}
          to='/'>
          Logout
        </NavLink>
      </>
    )
  }

  renderLoginLink = () => {
    return (
      <>
          <NavLink className='Links'
            to='/BeanList'>
            All Beans
          </NavLink>
          <NavLink className='Links'
            to='/login'>
            Log in
          </NavLink>
          <NavLink className='Links'
            to='/register'>
            Register
          </NavLink>
      </>
    )
  }

  render() {
 
    return <>
      <header>
        <NavLink to={'/'} className='nav-title'>FILTER</NavLink>
      </header>
      <nav className='nav-bar'>
        {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
      </nav>
    </>
  }
}


export default Header;





