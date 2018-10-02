import * as React from 'react';
import { connect } from 'react-redux';

import { EmptyHeaderComponent } from './HeaderEmpty/HeaderEmpty';
import { EmptyOptionsComponent } from './OptionsEmpty/OptionsEmpty';

import { EmptyBatch, Batch } from '../../../types/storage.types';
import { AsyncAction } from '../../../types/app.types';
import { OverallAppState } from '../../../reducers/initialState';
import { addBatchAsync } from '../../../actions/batches.actions';

interface MappedActions {
	addBatchAsync(userId: number, newBatch: EmptyBatch): AsyncAction;
}

interface MappedProps {
	userId: number;
}

type Props = MappedActions & MappedProps;

export class EmptyItemComponent extends React.Component<Props, EmptyBatch> {
	public state = new EmptyBatch();

	public onInputChange = changedValue => {
		this.setState(changedValue);
	};

	public onAddNewBatchClick = () => {
		const newBatch = this.state;
		this.props.addBatchAsync(this.props.userId, newBatch);
	};

	public render() {
		return (
			<div className="col-xl-6 col-xs-12">
				<div className="itemOverlay">
					<div className="item">
						<EmptyHeaderComponent
							onInputChange={this.onInputChange}
							{...this.state}
						/>
						<EmptyOptionsComponent
							buttons={['Add new batch']}
							functions={{
								Addnewbatch: this.onAddNewBatchClick,
							}}
						/>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: OverallAppState) => ({
	userId: state.app.user.userId,
});

export default connect(
	mapStateToProps,
	{ addBatchAsync }
)(EmptyItemComponent);
