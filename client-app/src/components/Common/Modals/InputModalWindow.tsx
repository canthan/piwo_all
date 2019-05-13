import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';

import './Modal.scss';
import { AnyFunction } from '../../../types/common.types';

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
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

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
        <Button variant="primary" onClick={handleConfirm}>Confirm</Button>
      </Modal.Footer>
    </Modal>
  );
}
