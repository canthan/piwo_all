import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

import NumberWithDescription from '../Inputs/NumberWithDescription';
import NumberWithButton from '../Inputs/NumberWithButton';
import { InputModalWindow } from './InputModalWindow';

import { AnyFunction } from '../../../types/common.types';
import { StashConfig } from '../../../types/app.types';

import './Modal.scss';
import './StashConfigModalWindow.scss';

interface Props {
  title: string;
  body: string;
  config: StashConfig[];
  onConfirm: AnyFunction;
  onCancel: AnyFunction;
}

export function StashConfigModalWindow(props: Props) {

  const [show, setShow] = useState<boolean>(true);
  const [config, setConfig] = useState<StashConfig[]>(props.config);
  const [addNewStash, openNewStashModal] = useState(false);

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
    props.onConfirm(config);
    setShow(false);
  }

  const handleChange = (value: string, stashName: string) => {
    const changedConfig = config.map(stash => stash.name !== stashName
      ? stash
      : { ...stash, cratesTotal: +value, }
    )
    setConfig(changedConfig);
  }

  const addStashField = (name: string) => {
    setConfig([...config, { cratesTotal: 0, name }])
    openNewStashModal(false);
  }

  return (
    <>
      <Modal show={show} onHide={handleClose} className={addNewStash ? 'modal--opaque' : ''}>
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal__body">
          <div className="modal__body__description">{props.body}</div>
          {(config || props.config).map(stash => (
            <NumberWithDescription
              key={stash.name}
              name={stash.name}
              value={stash.cratesTotal}
              onChange={(value: string, name: string) => handleChange(value, name)} />
          ))}
          <NumberWithButton name=" Add new stash" onClick={() => openNewStashModal(true)}>
            <FontAwesomeIcon icon={faPlusCircle}></FontAwesomeIcon>
          </NumberWithButton>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="primary" onClick={handleConfirm}>Confirm</Button>
        </Modal.Footer>
      </Modal>
      {
        addNewStash
          ? <InputModalWindow
            title={"Add new Stash"}
            body={`Please enter new stash name:`}
            onConfirm={(value: string) => addStashField(value)}
            onCancel={() => openNewStashModal(false)}
          />
          : null
      }
    </>
  );
}
