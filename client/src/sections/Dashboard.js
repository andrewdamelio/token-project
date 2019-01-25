import React from 'react';

import Box from '../components/Box';
import GetBalance from '../components/BalanceBox';

import './Dashboard.css';

// Dashboard page:
// Allows users to see token data and make new queries
const Dashboard = ({ data, tokenAddress, setlookupDate, lookupDate, goBack }) => {
  if (!data) {
    return null;
  }

  return (
    <div className="Dashboard">
      <GetBalance
        tokenAddress={tokenAddress}
        lookupDate={lookupDate}
      />

      <Box
        type="value"
        title="Average Transfer Amount"
        emoji="🏃"
        result={data.average}
        loaded={data.loaded}
      />

      <Box
        type="value"
        title="Median Transfer Amount"
        emoji="📊"
        result={ data.median }
        loaded={data.loaded}
      />

      <Box
        type="date"
        title="Data At A Given Time"
        emoji="📅"
        result={lookupDate}
        setResult={setlookupDate}
        loaded={data.loaded}
      />

      <Box
        type="address"
        title="Richest"
        emoji="💰"
        result={data.richest}
        loaded={data.loaded}
      />

      <Box
        type="address"
        title="Most Active"
        emoji="🚚"
        result={data.mover}
        loaded={data.loaded}
      />

      <div onClick={() => goBack() } className="Dashboard__goBack">↩︎</div>
   </div>
  );
}

export default Dashboard;
