import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editExpenseWallet, fetchAPI, submitWallet } from '../redux/actions';
import getCurrenceApi from '../services';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAPI());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    const { editor, idToedit, dispatch } = this.props;
    event.preventDefault();
    if (!editor) {
      const apiReturn = await getCurrenceApi();
      this.setState({ exchangeRates: apiReturn });
      dispatch(submitWallet(this.state));
      this.handleReset();
    }
    if (editor) {
      this.setState({ id: idToedit }, () => {
        dispatch(editExpenseWallet(this.state));
        this.handleReset();
      });
    }
  };

  handleReset = () => {
    const { id } = this.state;
    const sum = id + 1;
    this.setState({
      id: sum,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies, editor } = this.props;
    return (
      <form>
        <label htmlFor="expense">
          Despesa:
          <input
            type="number"
            name="value"
            value={ value }
            data-testid="value-input"
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="description">
          Descrição:
          <input
            type="texte"
            name="description"
            value={ description }
            data-testid="description-input"
            onChange={ this.handleChange }
          />
        </label>
        Moeda:
        <select
          id="currency-select"
          name="currency"
          value={ currency }
          data-testid="currency-input"
          onChange={ this.handleChange }
        >
          {currencies.map((op) => (
            <option
              value={ op }
              key={ op }
            >
              {op}
            </option>
          ))}
        </select>
        Método de pagamento:
        <select
          id="pagamento-select"
          name="method"
          value={ method }
          data-testid="method-input"
          onChange={ this.handleChange }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        Categoria da Despesa:
        <select
          id="pagamento-select"
          name="tag"
          value={ tag }
          data-testid="tag-input"
          onChange={ this.handleChange }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>

        <button
          type="submit"
          onClick={ this.handleSubmit }
        >
          {!editor ? 'Adicionar despesa' : 'Editar despesa' }
        </button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  dispatch: PropTypes.func.isRequired,
  // expenses: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  // idToedit: PropTypes.number.isRequired,
  editor: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  ...state.wallet,
});

export default connect(mapStateToProps)(WalletForm);
