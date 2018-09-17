import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import AppIndex from './appIndex.js';
import createAppStore  from './store/store';
import {PersistGate} from 'redux-persist/es/integration/react'

const {store, persistor} = createAppStore();


ReactDOM.render(
  <Provider store = {store}>
   <PersistGate persistor = {persistor}>
      <AppIndex/>
  </PersistGate>
  </Provider>, document.getElementById('root'));
