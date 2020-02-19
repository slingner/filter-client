import React, { Component } from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import { Section } from '../../components/Utils/Utils'
import './LoginPage.css'

export default class LoginPage extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  }

  
  handleLoginSuccess = () => {
    const { location, history } = this.props
    const destination = (location.state || {}).from || '/'
    history.push(destination)
    this.props.handleLoginSuccess()
  }

  render() {
    return (
      <Section className='LoginPage'>
        <h2 className='login-header'><span aria-label='coffee-emoji' role='img'>☕</span> Login <span aria-label='coffee-emoji' role='img'>☕</span></h2>
        <LoginForm
          onLoginSuccess={this.handleLoginSuccess}
        />
      </Section>
    )
  }
}
