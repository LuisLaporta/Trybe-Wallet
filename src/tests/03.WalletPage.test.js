import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import mockData from './helpers/mockData';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWith';
import Wallet from '../pages/Wallet';

const initialEntries = ['/carteira'];
const inputValueId = 'value-input';
const inputdescripId = 'description-input';
const alimento = 'Alimentação';
const initialState = {
  user: {
    email: 'lui.laporta99@gmail.com',
  },
  wallet: {
    currencies: Object.keys(mockData).filter((key) => key !== 'USDT'),
    expenses: [{
      id: 0,
      value: '99',
      description: 'Bala sete belo',
      currency: 'USD',
      method: 'Dinheiro',
      tag: alimento,
      exchangeRates: mockData,
    }],
    editor: false,
    idToedit: 0,
  },
};

describe('Carteira do Cliente', () => {
  test('Verifica se a page Wallet é renderizada corretamente', () => {
    const history = createMemoryHistory({ initialEntries });
    const url = renderWithRouterAndRedux(<App />, {
      history,
    });

    const { pathname } = url.history.location;
    expect(pathname).toBe('/carteira');
  });

  test('Verifica se todos os inputs estão na tela', () => {
    const history = createMemoryHistory({ initialEntries });
    renderWithRouterAndRedux(<App />, {
      history,
    });

    expect(screen.getByTestId(inputValueId)).toBeInTheDocument();
    expect(screen.getByTestId(inputdescripId)).toBeInTheDocument();
  });

  test('Verifica se todos os selects estão na tela', () => {
    const history = createMemoryHistory({ initialEntries });
    renderWithRouterAndRedux(<App />, {
      history,
    });

    expect(screen.getByTestId('currency-input')).toBeInTheDocument();
    expect(screen.getByTestId('method-input')).toBeInTheDocument();
    expect(screen.getByTestId('tag-input')).toBeInTheDocument();
  });

  test('Verifica se todos as options do select currency estão corretos', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    const history = createMemoryHistory({ initialEntries });
    renderWithRouterAndRedux(<App history={ history } />, {
      initialState,
      history,
    });

    const optionsCurrencies = initialState.wallet.currencies;

    const currencyIput = screen.getByTestId('currency-input');
    expect(currencyIput).toHaveValue(optionsCurrencies[0]);

    optionsCurrencies.forEach(async (option) => (
      expect(screen.getByRole('option', { name: option })).toBeInTheDocument()
    ));

    expect(global.fetch).toBeCalled();
    expect(global.fetch).toBeCalledTimes(1);
    expect(global.fetch).toBeCalledWith(
      'https://economia.awesomeapi.com.br/json/all',
    );

    global.fetch.mockRestore();
  });

  test('Verifica se todos as options do select method estão corretos', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    const history = createMemoryHistory({ initialEntries });
    renderWithRouterAndRedux(<App history={ history } />, {
      initialState,
      history,
    });

    const optionsMethod = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];

    const methodIput = screen.getByTestId('method-input');
    expect(methodIput).toHaveValue(optionsMethod[0]);

    optionsMethod.forEach((option) => (
      expect(screen.getByRole('option', { name: option })).toBeInTheDocument()
    ));

    global.fetch.mockRestore();
  });

  test('Verifica se todos as options do select tag estão corretos', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    const history = createMemoryHistory({ initialEntries });
    renderWithRouterAndRedux(<App history={ history } />, {
      initialState,
      history,
    });

    const optionsTag = [alimento, 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

    const tagIput = screen.getByTestId('tag-input');
    expect(tagIput).toHaveValue(optionsTag[0]);

    optionsTag.forEach((option) => (
      expect(screen.getByRole('option', { name: option })).toBeInTheDocument()
    ));

    global.fetch.mockRestore();
  });

  test('Verifica se o botão "Adicionar despesa" está na tela', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    const history = createMemoryHistory({ initialEntries });
    renderWithRouterAndRedux(<App history={ history } />, {
      initialState,
      history,
    });

    expect(screen.getByRole('button', { name: /adicionar despesa/i })).toBeInTheDocument();

    global.fetch.mockRestore();
  });

  test('Verifica se a table está na tela', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    const history = createMemoryHistory({ initialEntries });
    renderWithRouterAndRedux(<App history={ history } />, {
      initialState,
      history,
    });

    expect(screen.getByRole('columnheader', { name: /descrição/i })).toBeInTheDocument();

    global.fetch.mockRestore();
  });

  test('Verifica se a depesa é adicionada na tela, e os inputs são resetados', async () => {
    const history = createMemoryHistory({ initialEntries });
    const { store } = renderWithRouterAndRedux(<App history={ history } />, {
      initialState,
      history,
    });

    const inputValue = screen.getByTestId(inputValueId);
    const inputDescrip = screen.getByTestId(inputdescripId);
    const addButton = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.type(inputValue, '99');
    userEvent.type(inputDescrip, 'Bala sete belo');
    userEvent.click(addButton);

    const expense = store.getState().wallet.expenses[0];

    expect(inputValue.innerHTML).toBe('');
    expect(inputDescrip.innerHTML).toBe('');

    expect(screen.getByRole('cell', { name: expense.description })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: expense.tag })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: expense.method })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: '99.00' })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: 'Dólar Americano/Real Brasileiro' })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: '4.75' })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: '470.56' })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: 'Real' })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: 'Editar Deletar' })).toBeInTheDocument();
  });

  test('Verifica se as Depesas totais aparecem quando uma despesa é adicionada', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    const history = createMemoryHistory({ initialEntries });
    const { store } = renderWithRouterAndRedux(<App history={ history } />, {
      initialState,
      history,
    });

    const inputValue = screen.getByTestId(inputValueId);
    const addButton = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.type(inputValue, '99');
    userEvent.click(addButton);

    const expense = store.getState().wallet.expenses[0];
    const valueExpense = 99 * expense.exchangeRates[expense.currency].ask;

    expect(screen.getByTestId('total-field')).toHaveTextContent(valueExpense.toFixed(2));

    global.fetch.mockRestore();
  });

  test('Verifica se a Depesa é apagada quando clicar no botão deletar', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    const history = createMemoryHistory({ initialEntries });
    const { store } = renderWithRouterAndRedux(<App history={ history } />, {
      initialState,
      history,
    });

    const buttonDelet = screen.getByRole('button', { name: /deletar/i });
    userEvent.click(buttonDelet);

    expect(store.getState().wallet.expenses).toEqual([]);
  });

  test('Verifica se as Depesas totais diminuem quando uma despesa é apagada', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    const history = createMemoryHistory({ initialEntries });
    const { store } = renderWithRouterAndRedux(<App history={ history } />, {
      initialState,
      history,
    });

    const buttonDelet = screen.getByRole('button', { name: /deletar/i });
    userEvent.click(buttonDelet);

    expect(store.getState().wallet.expenses).toEqual([]);

    expect(screen.getByTestId('total-field')).toHaveTextContent(0.00);

    global.fetch.mockRestore();
  });

  test('Verifica se a Depesa é editada quando clicar no botão editar', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    const { store } = renderWithRouterAndRedux(<Wallet />, {
      initialState,
    });

    console.log(store.getState().wallet.expenses);

    const buttonEdit = screen.getByTestId('edit-btn');
    const inputValue = screen.getByTestId(inputValueId);

    userEvent.click(buttonEdit);
    userEvent.type(inputValue, '90');

    const buttonSave = screen.getByRole('button', { name: 'Editar despesa' });
    userEvent.click(buttonSave);

    const expense = [{
      id: 0,
      value: '90',
      currency: 'USD',
      method: 'Dinheiro',
      tag: alimento,
      description: '',
      exchangeRates: mockData,
    }];

    await waitFor(() => expect(store.getState().wallet.expenses[0]).toEqual(expense[0]));
  });
});
