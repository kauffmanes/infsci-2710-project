import React, { Component } from 'react';
import Routes from './Routes';
import Header from './Header';
import CustomBrowserRouter from './CustomBrowserWrapper';

import './normalize.css';
import './App.css';

class App extends Component {
  
  render() {
    return (
      <CustomBrowserRouter>
        <div className="App">
          <Header />
          <Routes />
        </div>
      </CustomBrowserRouter>
    );
  }
}

export default App;
