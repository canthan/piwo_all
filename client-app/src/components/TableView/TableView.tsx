import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Auth from '../Auth/auth';
import TableGrid from './TableGrid/TableGrid';

import { OverallAppState } from '../../reducers/initialState';
import { getUserDataAsync } from '../../actions/app.actions';

import { AsyncResult } from '../../types/common.types';

interface MappedProps {
  userId: string;
}

interface OwnProps {
  auth: Auth;
}

interface MappedActions {
  getUserDataAsync(userId: string): AsyncResult;
}

type Props = OwnProps & MappedProps & MappedActions

export const TableViewComponent = (props: Props) => {

  const getUserDataAsync = (userId: string): AsyncResult => props.getUserDataAsync(userId);

  useEffect(() => {
    getUserDataAsync(props.userId);
  }, [])

  return (
      <TableGrid />
  );
};

const mapStateToProps = ({ app }: OverallAppState) => ({
  userId: app.user.userId,
});

const actions = {
  getUserDataAsync,
};

export default connect(
  mapStateToProps,
  actions
)(TableViewComponent);
