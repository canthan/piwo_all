import * as React from 'react';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import dayjs from 'dayjs';

import { HeaderComponent } from './Header/Header';
import { EmptyHeaderComponent } from './../EmptyItem/HeaderEmpty/HeaderEmpty';
import { OverallQuantityComponent } from './OverallQuantity/OverallQuantity';
import { StashesComponent } from './Stashes/Stashes';
import { ButtonsComponent } from './Buttons/Buttons';
import { OptionsComponent } from './Options/Options';
import { Stash, SelectedStash, EmptyBatch, Batch } from '../../../types/storage.types';

import './StorageItem.scss';

import { OverallAppState } from '../../../reducers/initialState';
import { deleteBatchAsync, editBatchDataAsync } from '../../../actions/batches.actions';
import { addStashAsync, updateStashesAsync, deleteStashAsync } from '../../../actions/stashes.actions';
import { AsyncResult } from '../../../types/common.types';
import { ConfirmModalWindow } from '../../Common/Modals/ConfirmModalWindow';
import { InputModalWindow } from '../../Common/Modals/InputModalWindow';
import { INCREMENT_BUTTONS, DECREMENT_BUTTONS, OptionsButtons, DEFAULT_DATE_FORMAT } from '../../../types/storage.constants';

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
  deleteStashAsync(userId: string, stashId: string): AsyncResult;
}

type Props = MappedBatchActions & MappedStashActions & OwnProps;

interface State {
  stashes: Stash[];
  selected: SelectedStash;
  modified: boolean;
  edited: boolean;
  editedBatchData: EmptyBatch;
  deleteBatchModal: boolean;
  addStashModal: boolean;
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
    deleteBatchModal: false,
    addStashModal: false,
  };

  public onQuantityChange = (type: number, stashKey: number, target: HTMLInputElement | null, amount = 0) => {
    const newState: { stashes: Stash[] } = this.state;
    if (target) {
      newState.stashes[stashKey].items[type].amount = +target.value + amount;
    }
    this.setState({
      ...newState,
      modified: true,
    });
  };

  public onStashDelete = async (userId: string, stashId: string) => {
    await this.props.deleteStashAsync(userId, stashId);
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
    if (!this.state.selected.name) {
      return;
    }
    const { name = 0, stashKey = 0, target } = this.state.selected;

    if (name !== null && stashKey !== null && target !== null) {
      this.isInputSelected()
        ? this.onQuantityChange(name, stashKey, target, quantity)
        : alert('Please select input');
    }
  };

  public onAddStorageClick = async (name: string) => {
    this.setState({ addStashModal: false });

    const { batch: { batchId }, userId } = this.props;

    await this.props.addStashAsync(userId, batchId, name);
  };

  public onDeleteClick = async () => {
    this.setState({ deleteBatchModal: false });

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
    console.log(this, 'Mode');
  };

  public onSaveClick = async () => {
    const { userId, batch: { batchId } } = this.props;
    await this.props.updateStashesAsync(userId, batchId, this.state.stashes);
    this.props.getSummaryFromStashes();
    this.setState({ modified: false, });
  };

  public isInputSelected = () => (!!this.state.selected.name ? true : false);

  public onEditClick = () => {
    if (this.state.edited) {
      const { userId, batch: { batchId } } = this.props;
      this.props.editBatchDataAsync(userId, batchId, this.state.editedBatchData);
      this.setState({ edited: false, });
    } else {
      this.setState({ edited: true, });
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
      <>
        <div className={this.state.modified ? 'modified' : ''}>
          {this.state.edited ? (
            <EmptyHeaderComponent
              name={this.state.editedBatchData.name}
              batchNo={this.state.editedBatchData.batchNo}
              bottledOn={dayjs(this.state.editedBatchData.bottledOn).format(DEFAULT_DATE_FORMAT)}
              onInputChange={this.onInputChange}
            />
          ) : (
              <HeaderComponent
                name={name}
                batchNo={batchNo}
                bottledOn={dayjs(bottledOn).toDate()}
              />
            )}
          <section className="content row">
            <OverallQuantityComponent stashes={this.props.stashes} />
            <StashesComponent
              stashes={this.props.stashes}
              onQuantityChange={this.onQuantityChange}
              onQuantitySelection={this.onQuantitySelection}
              onStashDelete={this.onStashDelete}
            />
            <ButtonsComponent
              increase={{
                values: INCREMENT_BUTTONS,
                onQuantityChangeButton: this.onQuantityChangeButton,
              }}
              decrease={{
                values: DECREMENT_BUTTONS,
                onQuantityChangeButton: this.onQuantityChangeButton,
              }}
            />
          </section>
          <OptionsComponent
            buttons={Object.values(OptionsButtons)}
            functions={{
              Edit: this.onEditClick,
              Save: this.onSaveClick,
              Delete: () => this.setState({ deleteBatchModal: true }),
              Mode: this.onModeClick,
              AddStorage: () => this.setState({ addStashModal: true }),
            }}
            active={{
              Save: !this.state.modified,
            }}
          />
        </div>

        {
          this.state.deleteBatchModal
            ? <ConfirmModalWindow
              title={"Delete Batch"}
              body={`Are you sure you want to delete batch no. ${this.props.batch.batchNo} - ${this.props.batch.name} and all associated stashes?`}
              onConfirm={() => this.onDeleteClick()}
              onCancel={() => this.setState({ deleteBatchModal: false })}
            ></ConfirmModalWindow>
            : null
        }
        {
          this.state.addStashModal
            ? <InputModalWindow
              title={"Add new Stash"}
              body={`Please enter new stash name:`}
              onConfirm={(value: string) => this.onAddStorageClick(value)}
              onCancel={() => this.setState({ addStashModal: false })}
            ></InputModalWindow>
            : null
        }
      </>
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
  deleteStashAsync,
};

export default connect(
  mapStateToProps,
  actions
)(ItemComponent);
