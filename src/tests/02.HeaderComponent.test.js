import React from 'react';
import { screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWith';
import App from '../App';

const emailSucess = 'lui.laporta99@gmail.com';

describe('Verifica se o Header funciona corretamente', () => {
  test('Verifica se o componente renderiza o email do estado global', () => {
    const history = createMemoryHistory();
    const url = renderWithRouterAndRedux(<App />, {
      history,
    });

    const loginEmail = screen.getByLabelText(/E-mail/i);
    userEvent.type(loginEmail, emailSucess);

    const loginPassword = screen.getByLabelText(/Password/i);
    userEvent.type(loginPassword, '123456');

    const loginButton = screen.getByRole('button', { name: /Entrar/i });

    expect(loginButton.disabled).toBe(false);
    userEvent.click(loginButton);

    const { pathname } = url.history.location;
    expect(pathname).toBe('/carteira');

    const email = screen.getByTestId('email-field');
    expect(email).toHaveTextContent(url.store.getState().user.email);
  });

  test('Verifica se as depesas totais renderizam corretamente', () => {
    const history = createMemoryHistory();
    const url = renderWithRouterAndRedux(<App />, {
      history,
    });

    const loginEmail = screen.getByLabelText(/E-mail/i);
    userEvent.type(loginEmail, emailSucess);

    const loginPassword = screen.getByLabelText(/Password/i);
    userEvent.type(loginPassword, '123456');

    const loginButton = screen.getByRole('button', { name: /Entrar/i });

    expect(loginButton.disabled).toBe(false);
    userEvent.click(loginButton);

    const { pathname } = url.history.location;
    expect(pathname).toBe('/carteira');

    expect(screen.getByTestId('total-field')).toHaveTextContent(0.00);
  });

  test('Verifica se o câmbio renderiza corretamente', () => {
    const history = createMemoryHistory();
    const url = renderWithRouterAndRedux(<App />, {
      history,
    });

    const loginEmail = screen.getByLabelText(/E-mail/i);
    userEvent.type(loginEmail, emailSucess);

    const loginPassword = screen.getByLabelText(/Password/i);
    userEvent.type(loginPassword, '123456');

    const loginButton = screen.getByRole('button', { name: /Entrar/i });

    expect(loginButton.disabled).toBe(false);
    userEvent.click(loginButton);

    const { pathname } = url.history.location;
    expect(pathname).toBe('/carteira');

    const cambio = 'BRL';
    expect(screen.getByTestId('header-currency-field')).toHaveTextContent(cambio);
  });
});
