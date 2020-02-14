import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

class Header extends Component {

  

  renderLogoutLink = () => {
    
    return (
      <div className='Header__logged-in'>
      
        <Link
          onClick={this.props.logoutClick}
          to='/'>
          Logout
        </Link>
        <Link
          to='/Account'>
          Account
        </Link>
      </div>
    )
  }

  renderLoginLink = () => {
    return (
      <div className='Header__not-logged-in'>
        <Link 
          to='/about'>
          About
        </Link>
        <Link
          to='/login'>
          Log in
        </Link>
        <Link
          to='/register'>
          Register
        </Link>
      </div>
    )
  }

  render() {
 

    return <>
      <nav className='Header'>
        <h1>
        <Link to={'/'} className='nav-title'>FILTER</Link>
        </h1>
        {this.props.isAuthenticated
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
      </nav>
    </>
  }
}


export default Header;





