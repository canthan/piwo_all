import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import dayjs from 'dayjs';

import { StringWithTitle } from '../Inputs/StringWithTitle';
import { DateWithTitle } from '../Inputs/DateWithTitle';

import { AnyFunction } from '../../../types/common.types';
import { EmptyBatch } from '../../../types/storage.types';

import './Modal.scss';

interface Props {
  title: string;
  body: string;
  onConfirm: AnyFunction;
  onCancel: AnyFunction;
}

interface Validity {
  name: boolean;
  batchNo: boolean;
  bottledOn: boolean;
}

export function CreateBatchModalWindow(props: Props) {
  const currentDate = dayjs().toDate();

  const [show, setShow] = useState<boolean>(true);
  const [newBatch, setNewBatch] = useState<EmptyBatch>({ name: '', batchNo: '', bottledOn: currentDate });
  const [formValidity, setValidity] = useState<Validity>({ name: false, batchNo: false, bottledOn: true });

  const inputRef = useRef<HTMLInputElement>(null);
  const isValid = () => Object.values(formValidity).every(v => v);

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
    props.onConfirm(newBatch);
    setShow(false);
  }

  const handleChange = (newValue: string, valid: boolean, name: string) => {
    setNewBatch({ ...newBatch, [name]: newValue });
    setValidity({...formValidity, [name]: valid});
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
        <div className="col-6 input-line">
          <StringWithTitle
            name="batchNo"
            caption="Batch number"
            value=""
            onChange={(value: string, valid: boolean, name: string) => handleChange(value, valid, name)}
          />
        </div>
        <div className="col-12">
          <StringWithTitle
            name="name"
            caption="Batch name"
            value=""
            onChange={(value: string, valid: boolean, name: string) => handleChange(value, valid, name)}
          />
        </div>
        <div className="col-6">
          <DateWithTitle
            name="bottledOn"
            caption="Bottling date"
            value={currentDate}
            max={currentDate}
            onChange={(value: string, valid: boolean, name: string) => handleChange(value, valid, name)}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
        <Button variant="primary" type="submit" onClick={handleConfirm} disabled={!isValid()}>Confirm</Button>
      </Modal.Footer>
    </Modal>
  );
}
