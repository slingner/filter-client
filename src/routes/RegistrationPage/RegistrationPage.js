import React, { Component } from 'react'
import { Section } from '../../components/Utils/Utils'
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm'
import './RegistrationPage.css'

export default class RegistrationPage extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
  }

  handleRegistrationSuccess = user => {
    const { history } = this.props
    history.push('/login')
  }

  render() {
    return (
      <Section className='RegistrationPage'>
        <h2><span aria-label='coffee-emoji' role='img'>☕</span> Register <span aria-label='coffee-emoji' role='img'>☕</span></h2>
        <RegistrationForm
          onRegistrationSuccess={this.handleRegistrationSuccess}
        />
      </Section>
    )
  }
}
