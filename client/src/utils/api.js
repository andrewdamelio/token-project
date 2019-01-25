import BigNumber from 'bignumber.js';

export function getAllTokens() {
  return fetch("/tokens")
    .then(res => res.json())
}

export function getAverageTokenTransferAmount(tokenAddress, lookupDate) {
  return fetch(`/${tokenAddress}/stats/average?time=${lookupDate}`)
    .then(res => res.json())
    .then(res => BigNumber(res))
    .catch(err => {
      console.log('error:', err);
    });
}

export function getMedianTokenTransferAmount(tokenAddress, lookupDate) {
  return fetch(`/${tokenAddress}/stats/median?time=${lookupDate}`)
    .then(res => res.json())
    .then(res => BigNumber(res))
    .catch(err => {
      console.log('error:', err);
    });
}

export function getBiggestTokenHolder(tokenAddress, lookupDate) {
  return fetch(`/${tokenAddress}/stats/richest?time=${lookupDate}`)
    .then(res => res.json())
    .catch(err => {
      console.log('error:', err);
    });
}

export function getBiggestTokenMover(tokenAddress, lookupDate) {
  return fetch(`/${tokenAddress}/stats/mostActive?time=${lookupDate}`)
    .then(res => res.json())
    .catch(err => {
      console.log('error:', err);
    });
}

export function getBalanceForToken(tokenAddress, address, lookupDate) {
  return fetch(`/${tokenAddress}/account/${address}/balance?time=${lookupDate}`)
    .then(res => res.json())
    .catch(err => {
      console.log('error:', err);
    });
}
