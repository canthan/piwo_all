import * as React from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';

import { ItemOverlay } from './ItemOverlay/ItemOverlay';
import EmptyItemComponent from './EmptyItem/EmptyItem';
import StorageSummaryComponent from './Summary/Summary';

import { OverallAppState } from '../../reducers/initialState';
import { Stash, Batch } from '../../types/storage.types';

import './Storage.scss';
import { getSummaryFromStashes } from '../../actions/summary.actions';
// tslint:disable no-any

const ItemComponent = React.lazy(() => import('./StorageItem/StorageItem'));

interface MappedProps {
  userId: string;
  batches: Batch[];
  stashes: Stash[];
}

interface MappedActions {
  getSummaryFromStashes(stashes: Stash[]): AnyAction;
}

type Props = MappedActions & MappedProps;

export class StorageComponent extends React.Component<Props> {
  public getSummaryFromStashes = () =>
    this.props.getSummaryFromStashes(this.props.stashes);

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
          // userId={this.props.userId}
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
