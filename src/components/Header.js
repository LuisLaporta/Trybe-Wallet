import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email } = this.props;
    return (
      <div>
        <h4 data-testid="email-field">{email}</h4>
        <div>
          Despesas Totais:
          <span id="gastos" data-testid="total-field">0</span>
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
};

const mapStateToProps = (state) => ({
  ...state.user,
});

export default connect(mapStateToProps)(Header);
