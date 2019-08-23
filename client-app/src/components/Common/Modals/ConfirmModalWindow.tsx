import React, { useState, useEffect, useRef, createRef } from 'react';
import { Modal, Button } from 'react-bootstrap';

import { AnyFunction } from '../../../types/common.types';

import './Modal.scss';

interface Props {
  title: string;
  body: string;
  onConfirm: AnyFunction;
  onCancel: AnyFunction;
}

export const ConfirmModalWindow = (props: Props) => {

  const [show, setShow] = useState<boolean>(true);

  const defaultButton = useRef<HTMLButtonElement & Button<"button">>(null);

  useEffect(() => {
    if (show && defaultButton.current) defaultButton.current.focus();
  });

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
        <Button variant="primary" onClick={handleConfirm} ref={defaultButton}>Confirm</Button>
      </Modal.Footer>
    </Modal>
  );
}
