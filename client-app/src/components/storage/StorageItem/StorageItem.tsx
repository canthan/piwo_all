import * as React from 'react';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';

import { HeaderComponent } from './Header/Header';
import { EmptyHeaderComponent } from './../EmptyItem/HeaderEmpty/HeaderEmpty';
import { OverallQuantityComponent } from './OverallQuantity/OverallQuantity';
import { StashesComponent } from './Stashes/Stashes';
import { ButtonsComponent } from './Buttons/Buttons';
import { OptionsComponent } from './Options/Options';
import {
  Stash,
  SelectedStash,
  EmptyBatch,
  Batch,
  StashOutDTO,
} from '../../../types/storage.types';

import './StorageItem.scss';

import { OverallAppState } from '../../../reducers/initialState';
import { deleteBatchAsync, editBatchDataAsync } from '../../../actions/batches.actions';
import { addStashAsync, updateStashesAsync } from '../../../actions/stashes.actions';
import { initialStash } from '../../../types/storage.constants';
import { AsyncResult } from '../../../types/common.types';

interface OwnProps {
  batch: Batch;
  userId: string;
  stashes: Stash[];
  getSummaryFromStashes(): AnyAction;
}
interface MappedBatchActions {
  deleteBatchAsync(userId: string, batchId: string): AsyncResult;
  editBatchDataAsync(
    userId: string,
    batchId: string,
    batchData: EmptyBatch
  ): AsyncResult;
}
interface MappedStashActions {
  addStashAsync(userId: string, batchId: string, stashName: string): AsyncResult;
  updateStashesAsync(
    userId: string,
    batchId: string,
    stashes: Stash[]
  ): AsyncResult;
}
// tslint:disable-next-line no-magic-numbers
const INCREMENT_BUTTONS = [1, 3, 5];
// tslint:disable-next-line no-magic-numbers
const DECREMENT_BUTTONS = [-1, -3, -5];

type Props = MappedBatchActions & MappedStashActions & OwnProps;

interface State {
  stashes: Stash[];
  selected: SelectedStash;
  modified: boolean;
  edited: boolean;
  editedBatchData: EmptyBatch;
}

export class ItemComponent extends React.Component<Props, State> {
  public state = {
    stashes: this.props.stashes,
    selected: {
      target: null,
      name: null,
      stashKey: null,
    },
    modified: false,
    edited: false,
    editedBatchData: {
      name: this.props.batch.name,
      batchNo: this.props.batch.batchNo,
      bottledOn: this.props.batch.bottledOn,
    },
  };

  public onQuantityChange = (type: number , stashKey: number, target: HTMLInputElement, amount = 0) => {
    const newState: { stashes: Stash[] } = this.state;
    newState.stashes[stashKey].items[type] = Number(target.value) + amount;
    this.setState({
      ...newState,
      modified: true,
    });
  };

  public onQuantitySelection = (e: { target: HTMLInputElement }, name: string, stashKey: number) => {
    this.setState({
      selected: {
        name,
        stashKey,
        target: e.target,
      },
    });
  };

  public onQuantityChangeButton = (quantity: number) => {
    if (!this.state.selected) {
      return;
    }
    const { name = 0, stashKey = 0, target } = this.state.selected;

    if (name !== null && stashKey !== null && target !== null) {
      this.isInputSelected()
        ? this.onQuantityChange(name, stashKey, target, quantity)
        : alert('Please select input');
    }
  };

  public onAddStorageClick = async () => {
    const stashName = prompt('Enter new storage name');
    if (!stashName) {
      return;
    }
    const {
      batch: { batchId },
      userId,
    } = this.props;
    // const newStash = new Stash(newStorageName, batchId);
    const newStash = {
      ...initialStash,
      name: stashName,
    }
    // newStash.userId = userId;
    await this.props.addStashAsync(userId, batchId, stashName);
  };

  public onDeleteClick = async () => {
    const { batchNo, name } = this.props.batch;
    confirm(
      `Are you sure that Batch no.${batchNo} - ${name} should be deleted?`
    );
    if (!this.props.batch.batchId) {
      return;
    }
    await this.props.deleteBatchAsync(
      this.props.userId,
      this.props.batch.batchId
    );
    this.props.getSummaryFromStashes();
  };

  public onModeClick = () => {
    // console.log(this, 'Mode');
  };

  public onSaveClick = async () => {
    const {
      userId,
      batch: { batchId },
    } = this.props;
    await this.props.updateStashesAsync(userId, batchId, this.state.stashes);
    this.props.getSummaryFromStashes();
    this.setState({
      modified: false,
    });
  };

  public isInputSelected = () => (!!this.state.selected.name ? true : false);

  public onEditClick = () => {
    if (this.state.edited) {
      const {
        userId,
        batch: { batchId },
      } = this.props;
      this.props.editBatchDataAsync(
        userId,
        batchId,
        this.state.editedBatchData
      );
      this.setState({
        edited: false,
      });
    } else {
      this.setState({
        edited: true,
      });
    }
  };

  // tslint:disable no-any

  public onInputChange = (changedValue: any) => {
    this.setState({
      editedBatchData: {
        ...this.state.editedBatchData,
        ...changedValue,
      },
    });
  };

  public render() {
    const { name, batchNo, bottledOn } = this.props.batch;

    return (
      <div className="col-xl-6 col-xs-12">
        <div className="itemOverlay">
          <div className={this.state.modified ? 'item  modified' : 'item'}>
            {this.state.edited ? (
              <EmptyHeaderComponent
                name={this.state.editedBatchData.name}
                batchNo={this.state.editedBatchData.batchNo}
                bottledOn={this.state.editedBatchData.bottledOn}
                onInputChange={this.onInputChange}
              />
            ) : (
                <HeaderComponent
                  name={name}
                  batchNo={batchNo}
                  bottledOn={bottledOn}
                />
              )}
            <section className="content row">
              <OverallQuantityComponent stashes={this.props.stashes} />
              <StashesComponent
                stashes={this.props.stashes}
                onQuantityChange={this.onQuantityChange}
                onQuantitySelection={this.onQuantitySelection}
              />
              <ButtonsComponent
                increase={INCREMENT_BUTTONS}
                decrease={DECREMENT_BUTTONS}
                onQuantityChangeButton={this.onQuantityChangeButton}
              />
            </section>
            <OptionsComponent
              buttons={['Edit', 'Save', 'Delete', 'Mode', 'Add Storage']}
              functions={{
                Edit: this.onEditClick,
                Save: this.onSaveClick,
                Delete: this.onDeleteClick,
                Mode: this.onModeClick,
                AddStorage: this.onAddStorageClick,
              }}
              active={{
                Save: !this.state.modified,
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  public componentWillReceiveProps(nextProps: Props) {
    this.setState({
      stashes: nextProps.stashes,
    });
  }
}

const mapStateToProps = (state: OverallAppState) => ({
  userId: state.app.user.userId,
});

const actions = {
  deleteBatchAsync,
  addStashAsync,
  editBatchDataAsync,
  updateStashesAsync,
};

export default connect(
  mapStateToProps,
  actions
)(ItemComponent);
