import React from 'react';
import logo from './logo.svg';
import './App.css';

import { Provider } from 'react-redux';

import Routers from './Routers';
import { store } from './Store';


function App() {
  return (
    <Provider store={store}>
      <Routers />
    </Provider>
  );
}

export default App;
