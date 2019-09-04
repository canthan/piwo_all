import React from 'react';
import { connect } from 'react-redux';
import { RouterProps } from 'react-router';
import { Route, Switch } from 'react-router-dom';

import ProtectedRoute from './components/Common/ProtectedRoute/ProtectedRoute';
import { NotFound } from './components/Common/NotFound/NotFound';
import StorageComponent from './components/storage/Storage';
import Login from './components/Login/Login';
import Header from './components/Header/Header';
import UserProfile from './components/UserProfile/UserProfile';
import Auth from './components/Auth/auth';
import { Callback } from './components/Auth/Callback';

import { OverallAppState } from './reducers/initialState';

import './App.scss';
import TableViewComponent from './components/TableView/TableView';

type Props = RouterProps;

export function App(props: Props) {

  const auth = new Auth(props.history);

  return (
    <div className="app">
      <Route path='/' render={props => <Header auth={auth} {...props} />} />      <Switch>
        <Route path='/callback' render={props => <Callback auth={auth} {...props} />} />
        <Route path='/' exact render={props => <Login auth={auth} {...props} />} />
        <ProtectedRoute path='/storage' exact render={props => <StorageComponent auth={auth} {...props} />} />
        <ProtectedRoute path='/storageTable' exact render={props => <TableViewComponent auth={auth} {...props} />} />
        <ProtectedRoute path='/profile' exact render={props => <UserProfile auth={auth} {...props} />} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

const mapStateToProps = (state: OverallAppState) => ({
  userId: state.app.user.userId,
});


export default connect(
  mapStateToProps
)(App);
