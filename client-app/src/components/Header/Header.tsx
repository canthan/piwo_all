import React from 'react';
import { RouterProps } from 'react-router';
import { connect } from 'react-redux';

import { Menu } from './Menu/Menu';
import { UserToggle } from './UserToggle/UserToggle';

import { OverallAppState } from '../../reducers/initialState';
import { logoutAsync } from '../../actions/app.actions';

import { AsyncResult } from '../../types/common.types';
import { Routes } from '../../constants/routes';
import { getHeaderTitle } from '../../constants/text.constants';

import './Header.scss';

interface MappedProps {
  loggedIn: boolean;
  email: string;
}
interface MappedActions {
  logoutAsync: (email: string) => AsyncResult;
}

type Props = MappedProps & MappedActions & RouterProps;

export function Header(props: Props) {

  const logoutAsync = (email: string): AsyncResult => props.logoutAsync(email);

  const navigate = (route: string) => {
    if (route === Routes.default) {
      logoutAsync(props.email);
    }
    props.history.push(route);
  }

  return (
    <header className="header">
      <div className="header__menu col-3">
        {props.loggedIn ? <Menu /> : null}
      </div>
      <div className="header__title col-6">
        <h2>{getHeaderTitle(props.history.location.pathname)}</h2>
      </div>
      <div className="header__user col-3">
        {props.loggedIn ? <UserToggle onClick={(e) => navigate(e)} /> : null}
      </div>
    </header>
  )
}

const mapStateToProps = (state: OverallAppState) => ({
  loggedIn: state.app.loggedIn,
  email: state.app.user.email,
})

const actions = {
  logoutAsync
}


export default connect(mapStateToProps, actions)(Header);
