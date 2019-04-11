import * as React from 'react';

import '../Summary.scss';
import { StashSummary } from '../../../../types/storage.types';

interface Props {
	summary: StashSummary;
}

export class StorageSummaryLineComponent extends React.Component<Props> {
	public render() {
		return (
			<div className="container summary">
				<ul className="col-12 summary__list justify-content-around">
					<li className="col-1">{this.props.summary.stashName}</li>
					<li className="col-1">{this.props.summary.litres}</li>
					<li className="col-1">{this.props.summary.crates.overall}</li>
					<li className="col-1">{this.props.summary.crates.empty}</li>
					<li className="col-1">{this.props.summary.crates.full}</li>
					<li className="col-1">{this.props.summary.bottles.halfLiter}</li>
					<li className="col-1">{this.props.summary.bottles.small}</li>
				</ul>
			</div>
		);
	}
}
