import {
  REQUEST_API, GET_CURRENCE, WALLET_SUBMIT, WALLET_DELET,
} from '../actions/actionsTypes';

const initialState = {
  currencies: [],
  expenses: [],
  editor: false,
  idToedit: 0,
};

const walletReducer = (state = initialState, action) => {
  switch (action.type) {
  case REQUEST_API:
    return {
      ...state,
    };
  case GET_CURRENCE:
    return {
      ...state,
      currencies: action.data,
    };
  case WALLET_SUBMIT:
    return {
      ...state,
      expenses: [...state.expenses, action.wallet],
    };
  case WALLET_DELET:
    return {
      ...state,
      expenses: action.wallet,
    };
  default:
    return state;
  }
};

export default walletReducer;
