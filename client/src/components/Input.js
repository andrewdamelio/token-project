import React from 'react';

import './Input.css';

// input wrapper component
const Input = ({ value, type, placeholder, handleChange }) => {
  return (
    <input
      className="Input"
      type={type}
      placeholder={placeholder}
      onChange={(e) => handleChange(e)}
      value={value}
    />
  );
}

export default Input;
