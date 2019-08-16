import React, { useEffect } from 'react';
import { RouterProps } from 'react-router';
import { GridLoader } from 'react-spinners';

import Auth from './auth';

import './Callback.scss';

interface OwnProps {
  auth: Auth;
}

type Props = OwnProps & RouterProps;

export const Callback = (props: Props) => {

  useEffect(() => {
    if (/access_token|id_token|error/.test(props.history.location.hash)) {
      props.auth.handleAuthentication();
    } else {
      throw new Error('Invalid callback URL.');
    }
  })

  return (
    <div className="container callback">
      <GridLoader color={"#2d2d2d"}>
        <span>Loading...</span>
      </GridLoader>
    </div>
  );
};
