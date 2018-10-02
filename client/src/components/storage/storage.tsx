import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { connect, dispatch } from 'react-redux';
import { AnyAction } from 'redux';

import ItemComponent from './StorageItem/StorageItem';
import EmptyItemComponent from './EmptyItem/EmptyItem';
import StorageSummaryComponent from './Summary/Summary';
import { CommonStorageService } from './common.service';

import { OverallAppState } from '../../reducers/initialState';
import { AsyncAction } from '../../types/app.types';

import { Batch, Stash, BatchInDto } from '../../types/storage.types';

import './Storage.scss';
import { getSummaryFromStashes } from '../../actions/summary.actions';

interface MappedProps {
	userId: number;
	batches: BatchInDto[];
	stashes: Stash[];
}

interface MappedActions {
	getSummaryFromStashes(stashes: Stash[]): AnyAction;
}

type Props = MappedActions & MappedProps;

export class StorageComponent extends React.Component<Props> {
	public getSummaryFromStashes = () =>
		this.props.getSummaryFromStashes(this.props.stashes);

	public renderItem(batch, index) {
		const stashes = this.props.stashes.filter(
			stash => stash.batchId === batch.batchId
		);

		return (
			<ItemComponent
				batch={batch}
				key={index}
				stashes={stashes}
				userId={this.props.userId}
				getSummaryFromStashes={this.getSummaryFromStashes}
			/>
		);
	}

	public render() {
		return (
			<div>
				<StorageSummaryComponent />

				<div className="storage">
					<div className="container">
						<div className="row">
							{this.props.batches.map((batch: BatchInDto, index: number) =>
								this.renderItem(batch, index)
							)}
							<EmptyItemComponent />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: OverallAppState) => ({
	batches: state.batches.batches,
	stashes: state.stashes.stashes,
});

const actions = {
	getSummaryFromStashes,
};

export default connect(
	mapStateToProps,
	actions
)(StorageComponent);
