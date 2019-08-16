import React from 'react';
import { RouterProps } from 'react-router';
import { connect } from 'react-redux';

import { Menu } from './Menu/Menu';
import UserToggle from './UserToggle/UserToggle';

import { OverallAppState } from '../../reducers/initialState';
import { logoutAsync } from '../../actions/app.actions';

import { AsyncResult } from '../../types/common.types';
import { Routes } from '../../constants/routes';
import { getHeaderTitle } from '../../constants/text.constants';

import './Header.scss';
import Auth from '../Auth/auth';
import Actions from './Actions/Actions';

interface OwnProps {
  auth: Auth;
}

interface MappedProps {
  loggedIn: boolean;
  email: string;
  userName: string;
}
interface MappedActions {
  logoutAsync: (email: string) => AsyncResult;
}

type Props = OwnProps & MappedProps & MappedActions & RouterProps;

export const Header = (props: Props) => {

  const logoutAsync = (email: string): AsyncResult => props.logoutAsync(email);

  const navigate = (route: string) => {
    if (route === Routes.default) {
      logoutAsync(props.email);
    }
    props.history.push(route);
  }

  return (
    <div className="sticky-top">
      <header className="header">
        <div className="header__menu col-3">
          {
            props.loggedIn
              ? <>
                <Menu onClick={(e) => navigate(e)} />
                <Actions/>
              </>
              : null
          }
        </div>
        <div className="header__title col-6">
          <h2>{getHeaderTitle(props.history.location.pathname)}</h2>
        </div>
        <div className="header__user col-3">
          {props.loggedIn ? <UserToggle onClick={(e) => navigate(e)} /> : null}
        </div>
        {/* <div className="col-1">
        <button type="button" className="btn btn-secondary" onClick={props.auth.logout}>Log Out</button>
      </div> */}
      </header>
    </div>
  )
}

const mapStateToProps = (state: OverallAppState) => ({
  loggedIn: state.app.loggedIn,
  email: state.app.user.email,
  userName: state.app.user.surname && state.app.user.firstname
    ? `${state.app.user.firstname} ${state.app.user.surname}`
    : state.app.user.email,
})

const actions = {
  logoutAsync
}

export default connect(mapStateToProps, actions)(Header);
