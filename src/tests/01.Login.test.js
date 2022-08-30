import React from 'react';
import { screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWith';

const emailFailed = 'lui.laporta';
const emailSucess = 'lui.laporta99@gmail.com';

describe('Login do Cliente', () => {
  test('Verifica se a tela de Login renderiza corretamente', () => {
    const history = createMemoryHistory();
    const url = renderWithRouterAndRedux(<App />, {
      history,
    });

    const { pathname } = url.history.location;
    expect(pathname).toBe('/');
  });

  test('Verifica se o input de email está na tela', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });

    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
  });

  test('Verifica se o input password está na tela', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });

    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  test('Verifica se o botão de Entrar está na tela', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });

    expect(screen.getByRole('button', { name: /Entrar/i })).toBeInTheDocument();
  });

  test('Verifica se o botão aparece desabilitado', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });

    const loginButton = screen.getByRole('button', { name: /Entrar/i });
    expect(loginButton.disabled).toBe(true);
  });

  test('Verifica se o botão fica desabilitado se o E-mail estiver errado', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });

    const loginEmail = screen.getByLabelText(/E-mail/i);
    userEvent.type(loginEmail, emailFailed);

    const loginPassword = screen.getByLabelText(/Password/i);
    userEvent.type(loginPassword, '123456');

    const loginButton = screen.getByRole('button', { name: /Entrar/i });

    expect(loginEmail).toHaveValue(emailFailed);
    expect(loginPassword).toHaveValue('123456');
    expect(loginButton.disabled).toBe(true);
  });

  test('Verifica se o botão fica desabilitado se o Password estiver errado', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });

    const loginEmail = screen.getByLabelText(/E-mail/i);
    userEvent.type(loginEmail, emailSucess);

    const loginPassword = screen.getByLabelText(/Password/i);
    userEvent.type(loginPassword, '123');

    const loginButton = screen.getByRole('button', { name: /Entrar/i });

    expect(loginEmail).toHaveValue(emailSucess);
    expect(loginPassword).toHaveValue('123');
    expect(loginButton.disabled).toBe(true);
  });

  test('Verifica se o botão fica desabilitado se o E-mail e o Password estiverem errados', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });

    const loginEmail = screen.getByLabelText(/E-mail/i);
    userEvent.type(loginEmail, emailFailed);

    const loginPassword = screen.getByLabelText(/Password/i);
    userEvent.type(loginPassword, '123');

    const loginButton = screen.getByRole('button', { name: /Entrar/i });

    expect(loginEmail).toHaveValue(emailFailed);
    expect(loginPassword).toHaveValue('123');
    expect(loginButton.disabled).toBe(true);
  });

  test('Verifica se o botão fica habilitado se o E-mail e o Password estiverem corretos', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });

    const loginEmail = screen.getByLabelText(/E-mail/i);
    userEvent.type(loginEmail, emailSucess);

    const loginPassword = screen.getByLabelText(/Password/i);
    userEvent.type(loginPassword, '123456');

    const loginButton = screen.getByRole('button', { name: /Entrar/i });

    expect(loginEmail).toHaveValue(emailSucess);
    expect(loginPassword).toHaveValue('123456');
    expect(loginButton.disabled).toBe(false);
  });

  test('Verifica se ao clicar no botão, o cliente é enviado para a página Carteira', () => {
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
  });
});
