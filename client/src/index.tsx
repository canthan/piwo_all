import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import { store } from './store/index';

import './index.scss';
import 'bootstrap/dist/css/bootstrap.css';

// import App from './App';
import Root from './Root';
import { AppContainer } from 'react-hot-loader';

type Render = (component: React.ComponentClass) => void;

const render: Render = (Component: React.ComponentClass): void => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root')
  );
};

render(Root);

if (module.hot !== undefined) {
  module.hot.accept('./Root', () => {
    render(Root);
  });
}


// const rootEl = document.getElementById('root');

// ReactDOM.render(
//   <Provider store={store}>
//    <App />
//   </Provider>,
//   rootEl
// );

