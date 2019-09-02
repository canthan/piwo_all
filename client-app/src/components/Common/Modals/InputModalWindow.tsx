import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';

import { AnyFunction } from '../../../types/common.types';

import './Modal.scss';

interface Props {
  title: string;
  body: string;
  onConfirm: AnyFunction;
  onCancel: AnyFunction;
  forbibben?: string[];
  caseSensitive?: boolean;
  maxLength?: number;
}

export function InputModalWindow(props: Props) {
  const { caseSensitive = false, maxLength = 50 } = props;
  const [show, setShow] = useState<boolean>(true);
  const [value, setValue] = useState<string>('');
  const [valid, checkValidity] = useState<boolean>(false);

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
    const { value } = event.target;
    setValue(value);
    if (props.forbibben) {
      checkValidity(value !== '' && caseSensitive
        ? !props.forbibben.includes(value)
        : !props.forbibben.find(name => name.toLocaleUpperCase() === value.toLocaleUpperCase())
      );
    } else {
      checkValidity(value !== '');
    }
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (valid && e.key === 'Enter') {
      handleConfirm();
    }
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
          onKeyUp={(e) => handleKey(e)}
          maxLength={maxLength}
        />
        <div className="error-text">{
          !valid
            ? !value
              ? <span>Field cannot be empty</span>
              : <span>Name already exists</span>
            : null
        }</div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
        <Button variant="primary" type="submit" onClick={handleConfirm} disabled={!valid}>Confirm</Button>
      </Modal.Footer>
    </Modal>
  );
}
