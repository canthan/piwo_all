import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faBoxes, faTable } from '@fortawesome/free-solid-svg-icons'

import { CustomToggleWrapper } from '../../Common/CustomToggleWrapper/CustomToggleWrapper';
import { IconAndText, defaultIconAndTextConfig } from '../../Common/IconAndText/IconAndText';

import { AnyFunction } from '../../../types/common.types';
import { Routes } from '../../../constants/routes';

interface OwnProps {
  onClick: AnyFunction,
}

type Props = OwnProps;

export const Menu = (props: Props) => {
  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggleWrapper} id="dropdown-user">
        <IconAndText
          onClick={() => { }}
          text="Menu"
          icon={faBars}
          config={{
            ...defaultIconAndTextConfig,
          }}
        />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => props.onClick(Routes.storage)}><FontAwesomeIcon icon={faBoxes} /> Storage</Dropdown.Item>
        <Dropdown.Item onClick={() => props.onClick(Routes.storageTable)}><FontAwesomeIcon icon={faTable} /> Table view</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}
