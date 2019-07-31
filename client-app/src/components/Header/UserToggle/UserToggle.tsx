import React from 'react';
import { connect } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff, faIdCard, faUserCircle } from '@fortawesome/free-solid-svg-icons';

import { IconAndText, defaultIconAndTextConfig } from '../../Common/IconAndText/IconAndText';
import { CustomToggleWrapper } from '../../Common/CustomToggleWrapper/CustomToggleWrapper';

import { OverallAppState } from '../../../reducers/initialState';

import { AnyFunction } from '../../../types/common.types';
import { Routes } from '../../../constants/routes';

interface OwnProps {
  onClick: AnyFunction,
}
interface MappedProps {
  userName: string;
}

type Props = OwnProps & MappedProps;

export const UserToggle = (props: Props) => {
  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggleWrapper} id="dropdown-user">
        <IconAndText
          onClick={() => { }}
          text={props.userName}
          icon={faUserCircle}
          config={{
            ...defaultIconAndTextConfig,
            iconFirst: false,
          }}
        />
      </Dropdown.Toggle>
      <Dropdown.Menu alignRight>
        <Dropdown.Item onClick={() => props.onClick(Routes.profile)}><FontAwesomeIcon icon={faIdCard} /> View Profile</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={() => props.onClick(Routes.default)}><FontAwesomeIcon icon={faPowerOff} /> Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

const mapStateToProps = (state: OverallAppState) => ({
  userName: state.app.user.surname && state.app.user.firstname
    ? `${state.app.user.firstname} ${state.app.user.surname}`
    : state.app.user.email,
})

export default connect(mapStateToProps)(UserToggle);