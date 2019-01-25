import React, { Component } from 'react';
import web3 from 'web3';
import BigNumber from 'bignumber.js';

import { getBalanceForToken } from '../utils/api';
import Ether from '../components/Ether';
import Input from '../components/Input';

import './BalanceBox.css';

class BalanceBox extends Component {
  state = {
    balance: null,
    address: null
  }

  componentWillReceiveProps(nextProps) {
    // Clear balance lookup address is date range changes
    if (this.props.lookupDate !== nextProps.lookupDate) {
      this.setState({ address: '', balance: null });
    }
  }

  render() {
    const { tokenAddress } = this.props;
    if (!tokenAddress) {
      return null;
    }

    return (
      <div className="BalanceBox">
        <div className="BalanceBox__emoji">
          <span role="img" aria-label="telescope">🔭</span>
        </div>

        <div className="BalanceBox__title">
          <span role="img" aria-label="finger pointing down">👇</span>
          Lookup a Balance
          <span role="img" aria-label="finger pointing down">👇</span>
        </div>

        <Input
          type="string"
          placeholder="address"
          handleChange={(e) => this.validateAddress(e)}
          value={this.state.address}
        />

        {this.renderBalance()}
      </div>
    );
  }

  async getBalance(address) {
    const { tokenAddress, lookupDate } = this.props;

    const balance = await getBalanceForToken(tokenAddress, address, lookupDate);
    if (balance.error) {
      alert(balance.error);
      return;
    }

    this.setState({ balance: BigNumber(balance) });
  }

  renderBalance() {
    const { balance } = this.state;
    if (balance) {
      // const displayBalance = String(balance.toFixed());
      // const displayBalanceInETH = balance.toNumber() > 0 ? web3.utils.fromWei(displayBalance) : 0;

      return (
        <div className="BalanceBox__balance">
          <Ether value={balance} />
        </div>
      );
    }
    return null;
  }

  validateAddress(e) {
    this.setState({ address: e.target.value });

    if (web3 && web3.utils.isAddress(e.target.value)) {
      this.getBalance(e.target.value);
    }
    else {
      this.setState({ balance: null });
    }
  }
}

export default BalanceBox;
