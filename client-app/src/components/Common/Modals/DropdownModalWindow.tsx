import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

import { AnyFunction } from '../../../types/common.types';

import './Modal.scss';

interface Props {
  title: string;
  body: string;
  selectOptions: string[];
  onConfirm: AnyFunction;
  onCancel: AnyFunction;
  className?: string;
  additionalComponent?: JSX.Element;
}

export function DropdownModalWindow(props: Props) {

  const [show, setShow] = useState<boolean>(true);
  const [value, setValue] = useState<string>('');

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (props.selectOptions.length) setValue(props.selectOptions[0]);
    if (inputRef.current) inputRef.current.focus();
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
    <Modal show={show} onHide={handleClose} className={props.className}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal__body">
        <div className="modal__body__description">
          {props.body}
        </div>
        {props.selectOptions.length
          ? <Form>
            <Form.Group onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}>
              <Form.Control as="select" >
                {props.selectOptions.map(option => <option key={option}>{option}</option>)}
              </Form.Control>
            </Form.Group>
          </Form>
          : null
        }
        {props.additionalComponent}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
        <Button variant="primary" onClick={handleConfirm}>Confirm</Button>
      </Modal.Footer>
    </Modal>
  );
}
