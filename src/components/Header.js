import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import formatarNumero from '../services/formatarNumero';
import '../css/header.css';

class Header extends Component {
  sumOfExpenses = () => {
    const { expenses } = this.props;
    const exchange = expenses.map(({ value, currency, exchangeRates }) => (
      value * exchangeRates[currency].ask
    ));
    const sum = exchange.reduce((acc, curr) => curr + acc, 0).toFixed(2);
    return formatarNumero(Number(sum));
  };

  render() {
    const { email } = this.props;
    const svgProfile = `M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468
    11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z`;
    const svgDiner = `M0 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1
    1 0 0 1-1-1V5zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V7a2 2 0 0 1-2-2H3z`;
    return (
      <div className="form-header">
        <dv className="form-title">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cash-stack" viewBox="0 0 16 16">
            <path
              d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1H1zm7 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
            />
            <path d={ svgDiner } />
          </svg>
          <h1>Wallet</h1>
          <div className="user">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
              <path
                fillRule="evenodd"
                d={ svgProfile }
              />
            </svg>
            <h4 data-testid="email-field">{email}</h4>
          </div>
        </dv>
        <div className="form-descris">
          <div className="cambio border">
            Câmbio:
            <span id="gastos" data-testid="header-currency-field"> BRL</span>
          </div>

          <div className="despesas border">
            Despesas Totais: R$
            <span id="gastos" data-testid="total-field">
              {this.sumOfExpenses()}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

const mapStateToProps = (state) => ({
  ...state.user,
  ...state.wallet,
});

export default connect(mapStateToProps)(Header);
