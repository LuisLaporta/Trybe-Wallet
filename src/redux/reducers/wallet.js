import { WALLET_SUBMIT } from '../actions/actionsTypes';

const initialState = {
  currencies: [],
  expenses: [],
  editor: false,
  idToedit: 0,
};

const walletReducer = (state = initialState, action) => {
  switch (action.type) {
  case WALLET_SUBMIT:
    return {
      ...state,
      currencies: [...action.wallet.currencies],
      expenses: [...action.wallete.expenses],
      editor: action.wallete.editor,
      idToedit: action.wallete.idToedit,
    };
  default:
    return state;
  }
};

export default walletReducer;
