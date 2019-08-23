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
import { changeStashConfigAsync } from '../../../actions/app.actions';
import { deleteBatchAsync, editBatchDataAsync } from '../../../actions/batches.actions';
import { addStashAsync, updateStashesAsync, deleteStashAsync } from '../../../actions/stashes.actions';
import { AsyncResult } from '../../../types/common.types';
import { ConfirmModalWindow } from '../../Common/Modals/ConfirmModalWindow';
import { InputModalWindow } from '../../Common/Modals/InputModalWindow';
import { INCREMENT_BUTTONS, DECREMENT_BUTTONS, OptionsButtons, DEFAULT_DATE_FORMAT } from '../../../types/storage.constants';
import { DropdownModalWindow } from '../../Common/Modals/DropdownModalWindow';
import { OptionsButton } from '../../Common/OptionsButton/OptionsButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { StashConfig } from '../../../types/app.types';

interface OwnProps {
  batch: Batch;
  stashes: Stash[];
  getSummaryFromStashes(): AnyAction;
}

interface MappedProps {
  userId: string;
  stashConfig: StashConfig[],
  stashNames: string[];

}
interface MappedAppActions {
  changeStashConfigAsync(userId: string, stashConfig: StashConfig[]): AsyncResult;
}

interface MappedBatchActions {
  deleteBatchAsync(userId: string, batchId: string): AsyncResult;
  editBatchDataAsync(userId: string, batchId: string, batchData: EmptyBatch): AsyncResult;
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

type Props = MappedAppActions & MappedBatchActions & MappedStashActions & OwnProps & MappedProps;

interface State {
  stashes: Stash[];
  selected: SelectedStash;
  modified: boolean;
  edited: boolean;
  editedBatchData: EmptyBatch;
  deleteBatchModal: boolean;
  addStashModal: boolean;
  createStashModal: boolean;
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
    createStashModal: false,
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

  public onAddExistingStorageClick = async (name: string) => {
    this.setState({ addStashModal: false });

    const { batch: { batchId }, userId } = this.props;

    await this.props.addStashAsync(userId, batchId, name);
  };

  public onAddNewStorageClick = async (name: string) => {
    await this.onAddExistingStorageClick(name);
    const { stashConfig, userId } = this.props;
    await this.props.changeStashConfigAsync(userId, [...stashConfig, { name, cratesTotal: 0 }]);
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

  public onInputChange = (changedValue: { [x: string]: string }) => {
    this.setState({
      editedBatchData: {
        ...this.state.editedBatchData,
        ...changedValue,
      },
    });
  };

  public getPossibleStashes = (): string[] => this.props.stashNames.filter(name => !this.props.stashes.map(stash => stash.name).includes(name));

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
            ? <DropdownModalWindow
              className={this.state.createStashModal ? 'modal--opaque' : ''}
              title={"Add new Stash"}
              body={this.getPossibleStashes().length ? `Please select stash:` : 'Please add more stashes'}
              additionalComponent={
                <OptionsButton
                  role={" Add new Stash"}
                  onButtonClick={() => this.setState({ createStashModal: true })}
                >
                  <FontAwesomeIcon icon={faPlusCircle}></FontAwesomeIcon>
                </OptionsButton>
              }
              selectOptions={this.getPossibleStashes()}
              onConfirm={(value: string) => this.onAddExistingStorageClick(value)}
              onCancel={() => this.setState({ addStashModal: false })}
            ></DropdownModalWindow>
            : null
        }
        {
          this.state.createStashModal
            ? <InputModalWindow
              title={"Add new Stash"}
              body={`Please enter new stash name:`}
              onConfirm={(value: string) => this.onAddNewStorageClick(value)}
              onCancel={() => this.setState({ createStashModal: false })}
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

const mapStateToProps = ({ app: { user } }: OverallAppState) => ({
  userId: user.userId,
  stashConfig: user.stashConfig,
  stashNames: user.stashConfig.map(stash => stash.name.toLocaleUpperCase()),
});

const actions = {
  deleteBatchAsync,
  addStashAsync,
  editBatchDataAsync,
  updateStashesAsync,
  deleteStashAsync,
  changeStashConfigAsync,
};

export default connect(
  mapStateToProps,
  actions
)(ItemComponent);
