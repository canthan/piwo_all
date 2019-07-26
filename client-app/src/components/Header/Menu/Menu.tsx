import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

import './Menu.scss';

export const Menu = () => {
  return (
    <div className="menu">
      <div className="menu__icon">
        <FontAwesomeIcon icon={faBars} />
      </div>
    </div>
  )
}