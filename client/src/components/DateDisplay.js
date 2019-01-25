import React from 'react';
import Flatpickr from 'react-flatpickr'

import 'flatpickr/dist/themes/light.css'
import './DateDisplay.css';

const MIN_DATE = '1969-12-31';

// Display and Edit dateTime
const DateDisplay = ({ lookupDate, setlookupDate }) => {
  if (!lookupDate) {
    return null;
  }

  const displayAmount = new Date(lookupDate * 1000);

  return (
    <div className="DateDisplay">
      <Flatpickr
        id="picker"
        data-enable-time={true}
        value={displayAmount}
        options={{minDate: MIN_DATE}}
        onChange={date => setlookupDate(date)}
      />
    </div>
  );
}

export default DateDisplay;
