import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import StorageSummaryHeaderComponent from './SummaryHeader/SummaryHeader';
import { StorageSummaryLineComponent } from './SummaryLine/SummaryLine';

import { OverallAppState } from '../../../reducers/initialState';
import { changeSummaryCrates } from '../../../actions/summary.actions';

import { StashSummary } from '../../../types/storage.types';
import { StashConfig } from '../../../types/app.types';
import { ReduxAction } from '../../../types/common.types';

interface MappedProps {
  summary: StashSummary[];
  stashConfig: StashConfig[];
}

interface MappedActions {
  changeSummaryCrates: (summary: StashSummary[], stashConfig: StashConfig[]) => ReduxAction<StashSummary[]>;
}

type Props = MappedActions & MappedProps;

export const StorageSummaryComponent = (props: Props) => {

  useEffect(() => {
    props.changeSummaryCrates(props.summary, props.stashConfig);
  }, [props.stashConfig])

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

const actions = {
  changeSummaryCrates,
}

export default connect(mapStateToProps, actions)(StorageSummaryComponent);
