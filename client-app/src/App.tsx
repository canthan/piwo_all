import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Router, Route } from 'react-router-dom';

import StorageComponent from './components/storage/Storage';
import { OverallAppState } from './reducers/initialState';
import { getUserDataAsync } from './actions/app.actions';
import { AsyncResult } from './types/common.types';

import './App.scss';
// import { Login } from './components/Login/Login';

interface Props {
  // userId: string;
  getUserDataAsync(userId: string): AsyncResult;
}

interface State {
  userId: string;
}

export function App(props: Props) {

  const [userId, setUserId] = useState('1');
  useEffect(() => {
    getUserDataAsync(userId);
  })

  const getUserDataAsync = (userId: string): AsyncResult => props.getUserDataAsync(userId);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Storage app</h1>
      </header>
      {/* <Router>
        <Route path='/' exact component={Login}/>
        <Route path='/storage' exact component={StorageComponent}/>
        <StorageComponent userId={userId} />

      </Router> */}

      <StorageComponent userId={userId} />

    </div>
  );
}

const mapStateToProps = (state: OverallAppState) => ({
  userId: state.app.user.userId,
});

const actions = {
  getUserDataAsync,
};

export default connect(
  mapStateToProps,
  actions
)(App);
