import React from 'react';

import Input from '../components/Input';

import './Lookup.css';

const Lookup = ({ errors, tokenAddress, handleChange, handleClick}) => {
  return (
    <div className="Lookup">
      <div>Enter a Token Address</div>
      <Input
        type="string"
        placeholder="Token Contract"
        handleChange={(e) => handleChange(e)}
      />
      <div className="Lookup__button">
        <button disabled={!tokenAddress} onClick={() => handleClick()}>Go</button>
      </div>
      <div className="Lookup__errors">{errors || null } </div>
    </div>
  );
}

export default Lookup;
