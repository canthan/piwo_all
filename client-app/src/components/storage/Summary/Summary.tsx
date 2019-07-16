import * as React from 'react';
import { connect } from 'react-redux';

import StorageSummaryHeaderComponent from './SummaryHeader/SummaryHeader';
import { StorageSummaryLineComponent } from './SummaryLine/SummaryLine';
import { StashSummary } from '../../../types/storage.types';
import { OverallAppState } from '../../../reducers/initialState';

interface Props {
  summary: StashSummary[];
}

export function StorageSummaryComponent(props: Props) {
  return (
    <>
      <StorageSummaryHeaderComponent />
      {props.summary.map(stashSummary => (
        <StorageSummaryLineComponent
          summary={stashSummary}
          key={stashSummary.name}
        />
      ))}
    </>
  );
}

const mapStateToProps = (state: OverallAppState) => ({
  summary: state.summary.summary,
});

export default connect(mapStateToProps)(StorageSummaryComponent);
