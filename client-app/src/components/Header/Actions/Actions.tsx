import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPeopleCarry, faBoxes, faPlusSquare } from '@fortawesome/free-solid-svg-icons'

import { CustomToggleWrapper } from '../../Common/CustomToggleWrapper/CustomToggleWrapper';
import { StashConfigModalWindow } from '../../Common/Modals/StashConfigModalWindow';
import { IconAndText, defaultIconAndTextConfig } from '../../Common/IconAndText/IconAndText';

import { OverallAppState } from '../../../reducers/initialState';
import { changeStashConfigAsync } from '../../../actions/app.actions';

import { StashConfig } from '../../../types/app.types';
import { AsyncResult } from '../../../types/common.types';

interface MappedProps {
  userId: string;
  stashConfig: StashConfig[];
}

interface MappedActions {
  changeStashConfigAsync: (userId: string, stashConfig: StashConfig[]) => AsyncResult;
}
type Props = MappedProps & MappedActions;

export const Actions = (props: Props) => {
  const [configStashesModal, openConfigStashesModal] = useState<boolean>(false);
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
          <Dropdown.Item onClick={() => console.log('Add new batch clicked')}><FontAwesomeIcon icon={faPlusSquare} /> Add new batch</Dropdown.Item>
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
    </>
  )
}

const mapStateToProps = (state: OverallAppState) => ({
  userId: state.app.user.userId,
  stashConfig: state.app.user.stashConfig,
})

const actions = {
  changeStashConfigAsync,
}

export default connect(mapStateToProps, actions)(Actions);
