import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store/index';
import './index.scss';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';

const rootEl = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
   <App />
  </Provider>,
  rootEl
);

