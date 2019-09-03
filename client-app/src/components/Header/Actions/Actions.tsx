import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPeopleCarry, faBoxes, faPlusSquare } from '@fortawesome/free-solid-svg-icons'

import { CustomToggleWrapper } from '../../Common/CustomToggleWrapper/CustomToggleWrapper';
import { StashConfigModalWindow } from '../../Common/Modals/StashConfigModalWindow';
import { IconAndText, defaultIconAndTextConfig } from '../../Common/IconAndText/IconAndText';
import { CreateBatchModalWindow } from '../../Common/Modals/CreateBatchModalWindow';

import { OverallAppState } from '../../../reducers/initialState';
import { changeStashConfigAsync } from '../../../actions/app.actions';
import { addBatchAsync } from '../../../actions/batches.actions';

import { StashConfig } from '../../../types/app.types';
import { AsyncResult } from '../../../types/common.types';
import { EmptyBatch } from '../../../types/storage.types';

interface MappedProps {
  userId: string;
  stashConfig: StashConfig[];
}

interface MappedActions {
  changeStashConfigAsync: (userId: string, stashConfig: StashConfig[]) => AsyncResult;
  addBatchAsync: (userId: string, newBatch: EmptyBatch) => AsyncResult;
}
type Props = MappedProps & MappedActions;

export const Actions = (props: Props) => {
  const [configStashesModal, openConfigStashesModal] = useState<boolean>(false);
  const [createBatchModal, openCreateBatchModal] = useState<boolean>(false);
  const onStashConfigSubmit = (stashConfig: StashConfig[]) => props.changeStashConfigAsync(props.userId, stashConfig);

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle as={CustomToggleWrapper} id="dropdown-actions">
          <IconAndText
            onClick={() => { }}
            text="Actions"
            icon={faPeopleCarry}
            config={{
              ...defaultIconAndTextConfig,
            }}
          />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => openConfigStashesModal(true)}><FontAwesomeIcon icon={faBoxes} /> Configure Stashes</Dropdown.Item>
          <Dropdown.Item onClick={() => openCreateBatchModal(true)}><FontAwesomeIcon icon={faPlusSquare} /> Add new batch</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      {
        configStashesModal
          ? <StashConfigModalWindow
            title={"Configure Stashes"}
            body={`Set total number of crates in your stashes`}
            config={props.stashConfig}
            onConfirm={(stashConfig: StashConfig[]) => {
              onStashConfigSubmit(stashConfig);
              openConfigStashesModal(false);
            }}
            onCancel={() => openConfigStashesModal(false)}
          ></StashConfigModalWindow>
          : null
      }
      {
        createBatchModal
          ? <CreateBatchModalWindow
            title={"Add new batch"}
            body={`Please enter batch details`}
            onConfirm={(newBatch: EmptyBatch) => {
              props.addBatchAsync(props.userId, newBatch);
              openCreateBatchModal(false);
            }}
            onCancel={() => openCreateBatchModal(false)}
          ></CreateBatchModalWindow>
          : null
      }
    </>
  )
}

const mapStateToProps = (state: OverallAppState) => ({
  userId: state.app.user.userId,
  stashConfig: state.app.user.stashConfig,
})

const actions = {
  changeStashConfigAsync,
  addBatchAsync,
}

export default connect(mapStateToProps, actions)(Actions);
