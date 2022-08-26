import { USER_SUBMIT, WALLET_SUBMIT } from './actionsTypes';

const submitUser = (user) => ({
  type: USER_SUBMIT,
  user,
});

const submitWallet = (wallet) => ({
  type: WALLET_SUBMIT,
  wallet,
});

export { submitUser, submitWallet };
