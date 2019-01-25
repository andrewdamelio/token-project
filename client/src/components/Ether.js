import React from 'react';
import web3 from 'web3';

import './Ether.css';

const Ether = ({ value }) => {
  if (!value) {
    return 'No results';
  }

  const amount = value.toFixed().replace('.', '');
  const displayAmount = `${web3.utils.fromWei(amount).substr(0, 16)} Ξ`;

  return (
    <div className="Ether">
      { displayAmount }
    </div>
  );
}

export default Ether;
