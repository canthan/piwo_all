import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';

import { AnyFunction } from '../../../types/common.types';

import './Modal.scss';

interface Props {
  title: string;
  body: string;
  onConfirm: AnyFunction;
  onCancel: AnyFunction;
}

export function InputModalWindow(props: Props) {

  const [show, setShow] = useState<boolean>(true);
  const [value, setValue] = useState<string>('');

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTimeout(() => {
      if (inputRef.current) inputRef.current.focus();
    }, 0);
  }, [show]);

  const handleClose = () => {
    props.onCancel();
    setShow(false);
  }

  const handleConfirm = () => {
    props.onConfirm(value);
    setShow(false);
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal__body">
        <div className="modal__body__description">
          {props.body}
        </div>
        <input
          type="text"
          className="form-control"
          value={value}
          ref={inputRef}
          onChange={handleChange}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
        <Button variant="primary" onClick={handleConfirm} disabled={!value}>Confirm</Button>
      </Modal.Footer>
    </Modal>
  );
}
