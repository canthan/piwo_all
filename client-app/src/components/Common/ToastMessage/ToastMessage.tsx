import React from 'react';
import { Alert, AlertProps } from 'react-bootstrap';

import './ToastMessage.scss';

type Props = AlertProps;

export const ToastMessage = (props: Props) => {

  return (
    <Alert className='toast-message' {...props} />
  )

}