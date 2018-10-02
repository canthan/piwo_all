import * as React from 'react';
import { EmptyBatch } from '../../../../types/storage.types';

import './HeaderEmpty.scss';

interface PropsAction {
	onInputChange;
}

type Props = PropsAction & EmptyBatch;

export class EmptyHeaderComponent extends React.Component<Props> {
	public handleChange = e => {
		const changedValue = { [e.target.name]: e.target.value };
		this.props.onInputChange(changedValue);
	};

	public render() {
		let currentDate = new Date().toISOString();
		currentDate = currentDate.slice(0, currentDate.indexOf('T'));

		return (
			<div className="empty-heading">
				<div className="col-3">
					<input
						type="text"
						name="batchNumber"
						value={this.props.batchNumber}
						placeholder="#Number*"
						// placeholder={this.state.batchId.toString()}
						className="empty-heading__input"
						onChange={this.handleChange}
					/>
				</div>
				<div className="col-6">
					<input
						type="text"
						name="batchName"
						value={this.props.batchName}
						// placeholder={this.state.batchName}
						placeholder="Batch Name*"
						className="empty-heading__input"
						onChange={this.handleChange}
					/>
				</div>
				<div className="col-3">
					<input
						type="text"
						name="bottledOn"
						value={this.props.bottledOn}
						// placeholder={this.state.bottledOn}
						placeholder={`${currentDate}*`}
						className="empty-heading__input"
						onChange={this.handleChange}
					/>
				</div>
			</div>
		);
	}
}

export default EmptyHeaderComponent;
