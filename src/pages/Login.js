import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { submitUser } from '../redux/actions';
import '../css/login.css';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      disabled: true,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      const { email, password } = this.state;
      const five = 5;
      const regexEmail = /\S+@\S+\.\S+/;
      const validEmail = regexEmail.test(email);
      const validPassword = password.length > five;
      const valid = validEmail && validPassword;
      this.setState({ disabled: !valid });
    });
  };

  handleSubmit = () => {
    const { dispatch, history } = this.props;
    const { email } = this.state;
    dispatch(submitUser(email));
    history.push('/carteira');
  };

  render() {
    const { disabled } = this.state;
    return (
      <div className="container">
        <div className="form-container">
          <form
            className="login-form"
            onSubmit={ this.handleSubmit }
          >
            <label htmlFor="email" className="login-form__label">
              e-mail:
              <input
                type="email"
                name="email"
                id="email"
                className="login-form__input"
                placeholder="Digite seu e-mail"
                onChange={ this.handleChange }
                data-testid="email-input"
              />
            </label>

            <label htmlFor="password" className="login-form__label">
              password:
              <input
                type="password"
                name="password"
                id="password"
                className="login-form__input"
                placeholder="Digite sua senha"
                onChange={ this.handleChange }
                data-testid="password-input"
              />
            </label>
            <button
              type="submit"
              disabled={ disabled }
              className="login-form__button"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
