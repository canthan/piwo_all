import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';

import { ItemOverlay } from './ItemOverlay/ItemOverlay';
import EmptyItemComponent from './EmptyItem/EmptyItem';
import StorageSummaryComponent from './Summary/Summary';
import { SummaryToggle } from './Summary/SummaryToggle/SummaryToggle';

import { OverallAppState } from '../../reducers/initialState';
import { getSummaryFromStashes } from '../../actions/summary.actions';
import { getUserDataAsync } from '../../actions/app.actions';

import { Stash, Batch } from '../../types/storage.types';
import { AsyncResult } from '../../types/common.types';
import { StashConfig } from '../../types/app.types';

import Auth from '../Auth/auth';
import './Storage.scss';

const ItemComponent = React.lazy(() => import('./StorageItem/StorageItem'));

interface MappedProps {
  userId: string;
  stashConfig: StashConfig[];
  batches: Batch[];
  stashes: Stash[];
}

interface OwnProps {
  auth: Auth;
}

interface MappedActions {
  getSummaryFromStashes(stashes: Stash[], config: StashConfig[]): AnyAction;
  getUserDataAsync(userId: string): AsyncResult;
}

type Props = OwnProps & MappedActions & MappedProps;

export const StorageComponent = (props: Props) => {
  const getSummaryFromStashes = () => props.getSummaryFromStashes(props.stashes, props.stashConfig);
  const getUserDataAsync = (userId: string): AsyncResult => props.getUserDataAsync(userId);

  const [showSummary, setShowSummary] = useState(true);

  useEffect(() => {
    getUserDataAsync(props.userId);
  }, [])

  const renderItem = (batch: Batch, index: number) => {
    const stashes = props.stashes.filter(stash => stash.batchId === batch.batchId);

    return (
      <React.Suspense fallback={<ItemOverlay></ItemOverlay>} key={index}>
        <ItemOverlay children={<ItemComponent
          batch={batch}
          key={index}
          stashes={stashes}
          getSummaryFromStashes={getSummaryFromStashes}
        />} />
      </React.Suspense>
    );
  }

  return (
    <>
      {
        showSummary
          ? <>
            <StorageSummaryComponent />
            <SummaryToggle caption="Hide Summary" onClick={() => setShowSummary(false)} shown={showSummary}/>
          </>
          : <SummaryToggle caption="Show Summary" onClick={() => setShowSummary(true)} shown={showSummary}/>
      }
      <div className="storage">
        <div className="container">
          <div className="row">
            {props.batches.map((batch: Batch, index: number) =>
              renderItem(batch, index)
            )}
            <ItemOverlay children={<EmptyItemComponent />} />
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = ({ app, batches, stashes }: OverallAppState) => ({
  userId: app.user.userId,
  stashConfig: app.user.stashConfig,
  batches: batches.batches,
  stashes: stashes.stashes,
});

const actions = {
  getSummaryFromStashes,
  getUserDataAsync,
};

export default connect(
  mapStateToProps,
  actions
)(StorageComponent);
