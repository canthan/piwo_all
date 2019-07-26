import React from 'react';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'

import { OverallAppState } from '../../../../reducers/initialState';

import './UserDisplay.scss';
import { Dropdown } from 'react-bootstrap';


interface MappedProps {
  email: string;
  userName: string;
  onClick: (e: any) => {};
}

type Props = MappedProps;

export const UserDisplay = (props: Props) => {

  const handleClick = (e:any) => {
    e.preventDefault();

    props.onClick(e);
  }

  return (
    <div className="user-display" onClick={handleClick}>
      <div className="user-display__name" >
        <span>{props.userName ? props.userName : props.email}</span>
      </div>
      <div className="user-display__icon">
        <FontAwesomeIcon icon={faUserCircle} />
      </div>
    </div>
  )
}

const mapStateToProps = (state: OverallAppState) => ({
  email: state.app.user.email,
  userName: state.app.user.surname && state.app.user.firstname
    ? `${state.app.user.firstname} ${state.app.user.surname}`
    : '',
})

export default connect(mapStateToProps)(UserDisplay);