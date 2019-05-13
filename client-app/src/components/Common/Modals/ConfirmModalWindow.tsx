import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

import './Modal.scss';
import { AnyFunction } from '../../../types/common.types';

interface Props {
  title: string;
  body: string;
  onConfirm: AnyFunction;
  onCancel: AnyFunction;
}

export function ConfirmModalWindow(props: Props) {

  const [show, setShow] = useState<boolean>(true);

  const handleClose = () => {
    props.onCancel();
    setShow(false);
  }

  const handleConfirm = () => {
    props.onConfirm();
    setShow(false);
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.body}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
        <Button variant="primary" onClick={handleConfirm}>Confirm</Button>
      </Modal.Footer>
    </Modal>
  );
}
