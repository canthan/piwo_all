import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactSVG from 'react-svg';
import { connect } from 'react-redux';

import StorageComponent from './components/storage/storage';

import { AsyncAction } from './types/app.types';

import { getUserDataAsync } from './actions/app.actions';
import { OverallAppState } from './reducers/initialState';

import './App.scss';

interface Props {
	userId: number;
	getUserDataAsync(userId: number): AsyncAction;
}

export class App extends React.Component<Props> {
	componentDidMount(): void {
		const userId = 1;
		this.getUserData(userId);
	}

	getUserData = (userId: number): AsyncAction =>
		this.props.getUserDataAsync(userId);

	render() {
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

export default connect(
	mapStateToProps,
	{ getUserDataAsync }
)(App);
