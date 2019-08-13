import * as React from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';

import { ItemOverlay } from './ItemOverlay/ItemOverlay';
import EmptyItemComponent from './EmptyItem/EmptyItem';
import StorageSummaryComponent from './Summary/Summary';

import { OverallAppState } from '../../reducers/initialState';
import { getSummaryFromStashes } from '../../actions/summary.actions';
import { getUserDataAsync } from '../../actions/app.actions';

import { Stash, Batch } from '../../types/storage.types';
import { AsyncResult } from '../../types/common.types';

import './Storage.scss';
// import Auth from '../Auth/auth';
import { StashConfig } from '../../types/app.types';

const ItemComponent = React.lazy(() => import('./StorageItem/StorageItem'));

interface MappedProps {
  userId: string;
  stashConfig: StashConfig[];
  batches: Batch[];
  stashes: Stash[];
}

interface OwnProps {
  // auth: Auth;
}

interface MappedActions {
  getSummaryFromStashes(stashes: Stash[], config: StashConfig[]): AnyAction;
  getUserDataAsync(userId: string): AsyncResult;
}

type Props = OwnProps & MappedActions & MappedProps;

export class StorageComponent extends React.Component<Props> {
  public getSummaryFromStashes = () => this.props.getSummaryFromStashes(this.props.stashes, this.props.stashConfig);
  public getUserDataAsync = (userId: string): AsyncResult => this.props.getUserDataAsync(userId);

  componentDidMount() {
    this.getUserDataAsync(this.props.userId);
  }

  public renderItem(batch: Batch, index: number) {
    const stashes = this.props.stashes.filter(
      stash => stash.batchId === batch.batchId
    );

    return (
      <React.Suspense fallback={<ItemOverlay></ItemOverlay>} key={index}>
        <ItemOverlay children={<ItemComponent
          batch={batch}
          key={index}
          stashes={stashes}
          getSummaryFromStashes={this.getSummaryFromStashes}
        />} />
      </React.Suspense>
    );
  }

  public render() {
    return (
      <div>
        <StorageSummaryComponent />

        <div className="storage">
          <div className="container">
            <div className="row">
              {this.props.batches.map((batch: Batch, index: number) =>
                this.renderItem(batch, index)
              )}
              <ItemOverlay children={<EmptyItemComponent />} />
            </div>
          </div>
        </div>
      </div>
    );
  }
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
