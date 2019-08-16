import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';

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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, stashName: string) => {
    setConfig(config.map(stash => stash.name !== stashName
      ? stash
      : { ...stash, cratesTotal: +event.target.value, }
    ));
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal__body">
        <div className="modal__body__description">{props.body}</div>
        {config.map(stash => (
          <div className="stash-config__line" key={stash.name}>
            <input type="number"
              min={0}
              max={9999}
              className="form-control stash-config__line__input"
              value={stash.cratesTotal}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, stash.name)}
            ></input>
            <div className="stash-config__line__text">{stash.name.toUpperCase()}</div>
          </div>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
        <Button variant="primary" onClick={handleConfirm}>Confirm</Button>
      </Modal.Footer>
    </Modal>
  );
}
