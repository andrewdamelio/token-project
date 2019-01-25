import React, { Component } from 'react';

import Dashboard from './sections/Dashboard';
import Lookup from './sections/Lookup';

import {
  getAllTokens,
  getAverageTokenTransferAmount,
  getMedianTokenTransferAmount,
  getBiggestTokenHolder,
  getBiggestTokenMover
} from '../src/utils/api';

import './App.css';


class App extends Component {
  state = {
    recentSearches: [],
    allTokens: [],
    renderDashboard: false,
    lookupDate: null,
    data: {
      average: null,
      median: null,
      richest: null,
      mover: null
    }
  }

  // Get all valid token address from api
  async initTokens() {
    const allTokens = await getAllTokens();
    this.setState({
      allTokens
    });
  }

  async componentWillMount() {
    // Show dashboard loading state if dashboard Route detected
    if (window.location.pathname !== '/') {
      this.setState({ renderDashboard: true });

      // Hydate state with tokens
      await this.initTokens();

      // Render dashboard if token path is valid
      this.checkForValidTokenPath(this.state.allTokens);
    }

    // Hydate state with tokens
    await this.initTokens();
  }

  componentDidMount()  {
    const recentSearches = window.localStorage.getItem('recent');
    if (recentSearches) {
      this.setState({
        recentSearches: JSON.parse(recentSearches)
      });
    }
  }


  render() {
    const { recentSearches, renderDashboard, tokenAddress, lookupDate } = this.state;

    const renderHeader = () => {
      if (!renderDashboard) {
        return <h1 className="App__header">Token Dashboard</h1>;
      }
      return null;
    }

    const renderApp = () => {
      if (renderDashboard) {
        return (
          <Dashboard
            lookupDate={lookupDate}
            setlookupDate={(date) => this.setlookupDate(date)}
            tokenAddress={tokenAddress}
            data={this.state.data}
            goBack={() => this.goBack()} />
        );
      }
      return (
        <Lookup
          errors={this.state.errors}
          tokenAddress={tokenAddress}
          handleChange={(e) => this.setState({ tokenAddress: e.target.value })}
          handleClick={() => this.getTokenDetails(tokenAddress, lookupDate)}
        />
      );
    }

    const renderHistory = () => {
      if (!renderDashboard && recentSearches && recentSearches.length > 0) {
        const items = recentSearches.map((address, idx) => {
          return (
            <div className="App__history__item" key={idx}>
              <div className="App__history__address" onClick={() => this.getTokenDetails(address)}>{address}</div>
            </div>
          );
        });

        return (
          <div className="App__history">
            <h2 className="App__history__title">Recent Searches</h2>
            {items}
          </div>
        );
      }
      return null;
    }

    return (
      <div className="App">
        {renderHeader()}
        {renderApp()}
        {renderHistory()}
      </div>
    );
  }

  // Gets and Sets token metrics from api
  async getTokenDetails(tokenAddress, lookupDate) {
    // Get token metrics from current dateTime or from a provided dateTime
    const NOW = (new Date().getTime() / 1000).toFixed();
    const dateRange = lookupDate || NOW;

    if (tokenAddress && this.state.allTokens.includes(tokenAddress)) {
      // Save history for easy lookup
      if (!this.state.recentSearches.includes(tokenAddress)) {
        const searchData = JSON.stringify(this.state.recentSearches.concat(tokenAddress));
        window.localStorage.setItem('recent', searchData);
      }

      // Route Management
      window.history.pushState({}, null, `/${tokenAddress}`);

      // Update/Trigger Dashboard
      this.setState({ renderDashboard: true, errors: null });

      // Get necessarily token metric data
      const average = await getAverageTokenTransferAmount(tokenAddress, dateRange);
      const median =  await  getMedianTokenTransferAmount(tokenAddress, dateRange);
      const richest = await getBiggestTokenHolder(tokenAddress, dateRange);
      const mover =  await getBiggestTokenMover(tokenAddress, dateRange);

      // Set App state
      this.setState({
        lookupDate: dateRange,
        tokenAddress,
        data: {
          average,
          median,
          richest,
          mover,
          loaded: true
        }
      });
    }
    else {
      this.setState({
        errors: 'Sorry, that token address was not found.'
      });
    }
  }

  // Checks for a valid token address on the location path
  checkForValidTokenPath(validTokens) {
    const pathName = window.location.pathname.replace('/', '');

    if (!pathName) {
      return;
    }

    if (validTokens.includes(pathName)) {
      this.getTokenDetails(pathName, this.state.lookupDate);
    }
    else {
      window.history.pushState({}, null, '/');
      this.setState({ renderDashboard: false });
    }
  }

  // Change the dateTime for the api calls
  setlookupDate(date) {
    const lookupDate = new Date(date);
    if (lookupDate) {
      this.setState({
        lookupDate: lookupDate.getTime() / 1000,
        data: { }
      });
      this.getTokenDetails(this.state.tokenAddress, this.state.lookupDate);
    }
  }

  // Return to main route, UI cleanup
  goBack() {
    this.setState({ data:  {}, renderDashboard: false, tokenAddress: null });
    window.history.pushState({}, null, '/');
  }
}

export default App;
