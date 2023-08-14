import {
  USER_SUBMIT, REQUEST_API, GET_CURRENCE,
  WALLET_SUBMIT, WALLET_DELET, WALLET_EDIT, WALLET_EDIT_EXPENSE } from './actionsTypes';

import { getCurrenceApi } from '../../services';

export const submitUser = (user) => ({ type: USER_SUBMIT, user });

export const submitWallet = (wallet) => ({ type: WALLET_SUBMIT, wallet });

export const deleteWallet = (wallet) => ({ type: WALLET_DELET, wallet });

export const editWallet = (wallet) => ({ type: WALLET_EDIT, wallet });

export const editExpenseWallet = (expense) => ({ type: WALLET_EDIT_EXPENSE, expense });

export const requestAPI = () => ({ type: REQUEST_API });

export const getCurrence = (data) => ({ type: GET_CURRENCE, data });

export const failCurrence = (error) => ({ type: GET_CURRENCE, error });

export function fetchAPI() {
  return async (dispatch) => {
    dispatch(requestAPI());
    try {
      const data = await getCurrenceApi();
      const result = Object.keys(data);
      const curren = result.filter((code) => code !== 'USDT');
      dispatch(getCurrence(curren));
    } catch (error) {
      dispatch(failCurrence(error));
    }
  };
}
