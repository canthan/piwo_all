import * as React from 'react';
import { connect } from 'react-redux';

import StorageSummaryHeaderComponent from './SummaryHeader/SummaryHeader';
import { StorageSummaryLineComponent } from './SummaryLine/SummaryLine';
import { StashSummary } from '../../../types/storage.types';
import { OverallAppState } from '../../../reducers/initialState';

interface Props {
	summary: StashSummary[];
}

export class StorageSummaryComponent extends React.Component<Props> {
	public render() {
		return (
			<React.Fragment>
				<StorageSummaryHeaderComponent />
				{this.props.summary.map(stashSummary => (
					<StorageSummaryLineComponent
						summary={stashSummary}
						key={stashSummary.stashName}
					/>
				))}
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state: OverallAppState) => ({
	summary: state.summary.summary,
});

export default connect(mapStateToProps)(StorageSummaryComponent);
