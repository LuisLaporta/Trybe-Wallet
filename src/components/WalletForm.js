import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAPI } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAPI());
  }

  render() {
    const { data } = this.props;
    return (
      <div>
        <label htmlFor="expense">
          Despesa:
          <input
            type="number"
            name="expense"
            data-testid="value-input"
          />
        </label>

        <label htmlFor="description">
          Descrição:
          <input
            type="texte"
            name="description"
            data-testid="description-input"
          />
        </label>
        Moeda:
        <select id="currency-select" data-testid="currency-input">
          {data.map((op) => (
            <option
              value={ op }
              key={ op }
            >
              {op}
            </option>
          ))}
        </select>
        Método de pagamento:
        <select id="pagamento-select" data-testid="method-input">
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        Categoria da Despesa:
        <select id="pagamento-select" data-testid="tag-input">
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </div>
    );
  }
}

WalletForm.propTypes = {
  data: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
