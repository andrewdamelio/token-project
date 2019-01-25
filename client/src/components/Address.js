import React from 'react';
import Blockie from './Blockie';

import './Address.css';

const Address = ({ address }) => {
  if (!address) {
    return 'No results';
  }

  return (
    <div className="Address">
      <a target="_blank" href={`https://etherscan.io/address/${address}`} rel="noopener noreferrer">
        <Blockie address={address} />
        <div className="Address__label">{address.substr(0, 8)}</div>
      </a>
    </div>
  );
}

export default Address;
