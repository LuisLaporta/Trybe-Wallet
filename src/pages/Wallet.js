import React, { Component } from 'react';
import Header from '../components/Header';
import TableWallet from '../components/TableWallet';
import WalletForm from '../components/WalletForm';

class Wallet extends Component {
  render() {
    return (
      <div>
        <Header />
        <WalletForm />
        <TableWallet />
      </div>
    );
  }
}

export default Wallet;
