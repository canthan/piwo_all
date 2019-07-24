import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ProtectedRoute from './components/Common/ProtectedRoute/ProtectedRoute';
import { NotFound } from './components/Common/NotFound/NotFound';
import StorageComponent from './components/storage/Storage';
import { OverallAppState } from './reducers/initialState';

import './App.scss';
import Login from './components/Login/Login';

interface Props {

}

interface State {
  userId: string;
}

export function App(props: Props) {

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Storage app</h1>
      </header>
      <Router>
        <Switch>
          <Route path='/' exact component={Login} />
          <ProtectedRoute path='/storage' exact component={StorageComponent} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

const mapStateToProps = (state: OverallAppState) => ({
  userId: state.app.user.userId,
});


export default connect(
  mapStateToProps
)(App);
