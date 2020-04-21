import React, { Component } from 'react';
import { Button, Input } from '../Utils/Utils';
import AuthApiService from '../../services/auth-api-service';
import TokenService from '../../services/token-service';
import { ReactComponent as FlowerFilter } from './flowerfilter.svg';
export default class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => {},
  };

  state = { error: null };

  handleSubmitJwtAuth = (event) => {
    event.preventDefault();
    const { user_name, password } = event.target;

    this.setState({ error: null });

    AuthApiService.postLogin({
      user_name: user_name.value,
      password: password.value,
    })
      .then((res) => {
        user_name.value = '';
        password.value = '';
        TokenService.saveAuthToken(res.authToken);
        this.props.onLoginSuccess();
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  render() {
    const { error } = this.state;
    return (
      <form className="LoginForm" onSubmit={this.handleSubmitJwtAuth}>
        <div role="alert">{error && <p className="red">{error}</p>}</div>
        <FlowerFilter
          style={{
            fill: 'rgb(210,210,210)',
            margin: 'auto',
            width: '100px',
            marginTop: '40px',
            justifyContent: 'center',
          }}
        />

        <div className="user_name">
          <label htmlFor="LoginForm__user_name" />

          <Input
            required
            name="user_name"
            id="LoginForm__user_name"
            placeholder="Username"
          ></Input>
        </div>

        <label htmlFor="LoginForm__password" />
        <Input
          required
          name="password"
          type="password"
          id="LoginForm__password"
          placeholder="Password"
        ></Input>

        <Button type="submit">Login</Button>
      </form>
    );
  }
}
