import React, { Component } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import Routes from './Routes';
import Header from './components/Header';
import CustomBrowserRouter from './CustomBrowserWrapper';

import configureStore from './configureStore';
import './normalize.css';
import './App.css';

const store = configureStore;

class App extends Component {
  
  render() {
    return (
      <CustomBrowserRouter>
        <ReduxProvider store={store}>
          <div className="App">
            <BrowserRouter>
              <Header />
              <Routes />
            </BrowserRouter>
          </div>
        </ReduxProvider>
      </CustomBrowserRouter>
    );
  }
}

export default App;
