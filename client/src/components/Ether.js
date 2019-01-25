import React from 'react';
import { fromWei } from 'web3-utils';

import './Ether.css';

// Display value as Ether amount
const Ether = ({ value }) => {
  if (!value) {
    return 'No results';
  }

  const amount = value.toFixed(0);
  const displayAmount = `${fromWei(amount).substr(0, 16)} Ξ`;

  return (
    <div className="Ether">
      { displayAmount }
    </div>
  );
}

export default Ether;
