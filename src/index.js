import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import 'antd/dist/antd.css';
import 'react-toastify/dist/ReactToastify.css';

import { PersistGate } from 'redux-persist/integration/react';

import { Provider } from 'react-redux'
import store, { persistor } from 'app/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

