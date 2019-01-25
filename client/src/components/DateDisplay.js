import React from 'react';
import Flatpickr from 'react-flatpickr'

import 'flatpickr/dist/themes/light.css'
import './DateDisplay.css';

const DateDisplay = ({ lookupDate, setlookupDate }) => {
  if (!lookupDate) {
    return null;
  }

  const displayAmount = new Date(lookupDate * 1000);

  return (
    <div className="DateDisplay">
      <div className="DateDisplay__content">
        <div className="DateDisplay__changeDateTime">
          <Flatpickr
            id="picker"
            data-enable-time={true}
            value={displayAmount}
            options={{minDate: '1969-12-31'}}
            onChange={date => setlookupDate(date)}
          />
        </div>
      </div>
    </div>
  );
}

export default DateDisplay;


