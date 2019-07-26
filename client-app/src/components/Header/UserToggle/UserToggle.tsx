import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff, faIdCard } from '@fortawesome/free-solid-svg-icons';

import UserDisplay from '../UserPanel/UserDisplay/UserDisplay';
import { AnyFunction } from '../../../types/common.types';
import { Routes } from '../../../constants/routes';

interface Props {
  onClick: AnyFunction,
}

export const UserToggle = (props: Props) => {
  return (
      <Dropdown>
        <Dropdown.Toggle as={UserDisplay} id="dropdown-user"></Dropdown.Toggle>
        <Dropdown.Menu alignRight>
          <Dropdown.Item onClick={() => props.onClick(Routes.profile)}><FontAwesomeIcon icon={faIdCard} /> View Profile</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={() => props.onClick(Routes.default)}><FontAwesomeIcon icon={faPowerOff} /> Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
  )
}
