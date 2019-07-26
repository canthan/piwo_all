import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ProtectedRoute from './components/Common/ProtectedRoute/ProtectedRoute';
import { NotFound } from './components/Common/NotFound/NotFound';
import StorageComponent from './components/storage/Storage';
import Login from './components/Login/Login';
import Header from './components/Header/Header';

import { OverallAppState } from './reducers/initialState';

import './App.scss';
import { UserProfile } from './components/UserProfile/UserProfile';

export function App() {
  return (
    <div className="app">
      <Router>
        <Route path='/' component={Header} />
        <Switch>
          <Route path='/' exact component={Login} />
          <ProtectedRoute path='/storage' exact component={StorageComponent} />
          <ProtectedRoute path='/profile' exact component={UserProfile} />
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
