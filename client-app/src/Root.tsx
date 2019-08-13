import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from './store/index';
import App from './App';

export default class Root extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <Router>
          <Route component={App} />
        </Router>
      </Provider>
    );
  }
}
