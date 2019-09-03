import * as React from 'react';
import { connect } from 'react-redux';

import { EmptyHeaderComponent } from './HeaderEmpty/HeaderEmpty';
import { EmptyOptionsComponent } from './OptionsEmpty/OptionsEmpty';

import { EmptyBatch } from '../../../types/storage.types';
import { OverallAppState } from '../../../reducers/initialState';
import { addBatchAsync } from '../../../actions/batches.actions';
import { initialEmptyBatch } from '../../../types/storage.constants';
import { AsyncResult } from '../../../types/common.types';

interface MappedActions {
  addBatchAsync(userId: string, newBatch: EmptyBatch): AsyncResult;
}

interface MappedProps {
  userId: string;
}

type Props = MappedActions & MappedProps;

export class EmptyItemComponent extends React.Component<Props, EmptyBatch> {
  public state = initialEmptyBatch;

  public onInputChange = (changedValue: EmptyBatch) => {
    this.setState(changedValue);
  };

  public onAddNewBatchClick = () => {
    const newBatch = this.state;
    this.props.addBatchAsync(this.props.userId, newBatch);
  };

  public render() {
    return (
      <>
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
      </>
    );
  }
}

const actions = {
  addBatchAsync
};

const mapStateToProps = (state: OverallAppState) => ({
  userId: state.app.user.userId,
});

export default connect(
  mapStateToProps,
  actions
)(EmptyItemComponent);
