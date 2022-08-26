import { USER_SUBMIT } from '../actions/actionsTypes';

const initialState = {
  email: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
  case USER_SUBMIT:
    return { ...state, email: action.user };
  default:
    return state;
  }
};

export default userReducer;
