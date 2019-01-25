import React from 'react';
import blockies from 'blockies';

import './Blockie.css';

const Blockie = ({ address }) => {
  if (!address) {
    return null;
  }

  const avatar = blockies({
    seed: address.toLowerCase(),
    size: 8
  }).toDataURL();

  return (
    <img className="Blockie__avatar" src={avatar} alt={address} />
  );
}

export default Blockie;
