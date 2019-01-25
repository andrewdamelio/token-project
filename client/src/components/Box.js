import React from 'react';

import Address from './Address';
import Ether from './Ether';
import DateDisplay from './DateDisplay';

import './Box.css';

const Box = ({ loaded, type, title, emoji, result, setResult }) => {
  if (!loaded) {
    return (
      <div className="Box">
        <div className="Box__title--mask" />
        <div className="Box__emoji--mask" />
        <div className="Box__result--mask" />
      </div>
    );
  }

  let renderResults = null;

  if (type === 'value') {
    renderResults = <Ether value={result} />;
  }
  else if (type === 'address') {
    renderResults = <Address address={result} />;
  }
  else if (type === 'date') {
    renderResults = <DateDisplay setlookupDate={setResult} lookupDate={result} />;
  }

  return (
    <div className="Box">
      <div className="Box__title">{title}</div>
      <span className="Box__emoji">{emoji}</span>
      {renderResults}
    </div>
  );
}

export default Box;
