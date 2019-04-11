import React from 'react';
import { connect } from 'react-redux';

import { AsyncResult } from './types/app.types';
import StorageComponent from './components/storage/storage';
import { OverallAppState } from './reducers/initialState';
import { getUserDataAsync } from './actions/app.actions';

import './App.scss';

interface Props {
  userId: number;
  getUserDataAsync(userId: number): AsyncResult;
}

export class App extends React.Component<Props> {
  public componentDidMount(): void {
    const userId = 1;
    this.getUserDataAsync(userId);
  }

  public getUserDataAsync = (userId: number): AsyncResult =>
    this.props.getUserDataAsync(userId);

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Storage app</h1>
        </header>
        <StorageComponent userId={this.props.userId} />
      </div>
    );
  }
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
