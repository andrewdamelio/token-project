import React, { Component } from 'react';
import { isAddress } from 'web3-utils';
import BigNumber from 'bignumber.js';

import { getBalanceForToken } from '../utils/api';
import Ether from '../components/Ether';
import Input from '../components/Input';

import './BalanceBox.css';

class BalanceBox extends Component {
  state = {
    balance: null,
    address: ''
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

    if (isAddress(e.target.value)) {
      this.getBalance(e.target.value);
    }
    else {
      this.setState({ balance: null });
    }
  }
}

export default BalanceBox;
