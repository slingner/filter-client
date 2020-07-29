import React, { Component } from 'react';
import { Button, Input } from '../Utils/Utils';
import './RegistrationForm.css';
import AuthApiService from '../../services/auth-api-service';
import { ReactComponent as FilterHand } from './filterlogohand.svg';
export default class RegistrationForm extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => {},
  };

  state = { error: null };

  handleSubmit = (ev) => {
    ev.preventDefault();
    const { full_name, user_name, password } = ev.target;

    this.setState({ error: null });
    AuthApiService.postUser({
      user_name: user_name.value,
      password: password.value,
      full_name: full_name.value,
    })
      .then((user) => {
        full_name.value = '';
        user_name.value = '';
        password.value = '';
        this.props.onRegistrationSuccess();
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  render() {
    const { error } = this.state;
    return (
      <form className='RegistrationForm' onSubmit={this.handleSubmit}>
        <div role='alert'>{error && <p className='red'>{error}</p>}</div>
        <FilterHand className='filterHandBean' />
        <h2 className='welcome'> Welcome To Filter </h2>
        <div className='full_name'>
          <label htmlFor='RegistrationForm__full_name' />
          {/* <Required /> */}
          <Input
            name='full_name'
            type='text'
            required
            id='RegistrationForm__full_name'
            placeholder='Name'
          ></Input>
        </div>
        <div className='user_name'>
          <label htmlFor='RegistrationForm__user_name' />

          <Input
            name='user_name'
            type='text'
            required
            id='RegistrationForm__user_name'
            placeholder='Username'
          ></Input>
        </div>
        <div className='password'>
          <label htmlFor='RegistrationForm__password' />
          <Input
            name='password'
            type='password'
            required
            id='RegistrationForm__password'
            placeholder='Password'
          ></Input>
        </div>

        <Button type='submit'>Signup</Button>
      </form>
    );
  }
}
