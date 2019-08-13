import * as React from 'react';
import { connect } from 'react-redux';

import StorageSummaryHeaderComponent from './SummaryHeader/SummaryHeader';
import { StorageSummaryLineComponent } from './SummaryLine/SummaryLine';

import { OverallAppState } from '../../../reducers/initialState';

import { StashSummary } from '../../../types/storage.types';
import { StashConfig } from '../../../types/app.types';

interface Props {
  summary: StashSummary[];
  stashConfig: StashConfig[];
}

export const StorageSummaryComponent = (props: Props) => {

  return (
    <div className="summary">
      <StorageSummaryHeaderComponent />
      {props.summary.map(stashSummary => (
        <StorageSummaryLineComponent
          summary={stashSummary}
          key={stashSummary.name}
        />
      ))}
    </div>
  );
}

const mapStateToProps = ({ summary: { summary }, app: { user: { stashConfig = [] } } }: OverallAppState) => ({
  summary,
  stashConfig,
});

export default connect(mapStateToProps)(StorageSummaryComponent);
