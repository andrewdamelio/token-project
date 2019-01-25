import React from 'react';
import web3 from 'web3';

import './Ether.css';

// Display value as Ether amount
const Ether = ({ value }) => {
  if (!value) {
    return 'No results';
  }

  const amount = value.toFixed(0);
  const displayAmount = `${web3.utils.fromWei(amount).substr(0, 16)} Ξ`;

  return (
    <div className="Ether">
      { displayAmount }
    </div>
  );
}

export default Ether;
