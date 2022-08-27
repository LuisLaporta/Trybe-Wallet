import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  sumOfExpenses = () => {
    const { expenses } = this.props;
    const exchange = expenses.map(({ value, currency, exchangeRates }) => (
      value * exchangeRates[currency].ask
    ));
    const sum = exchange.reduce((acc, curr) => curr + acc, 0).toFixed(2);
    console.log(sum);
    return sum;
  };

  render() {
    const { email } = this.props;
    return (
      <div>
        <h4 data-testid="email-field">{email}</h4>
        <div>
          Despesas Totais:
          <span id="gastos" data-testid="total-field">
            {this.sumOfExpenses()}
          </span>
        </div>

        <div>
          Câmbio:
          <span id="gastos" data-testid="header-currency-field">BRL</span>
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
