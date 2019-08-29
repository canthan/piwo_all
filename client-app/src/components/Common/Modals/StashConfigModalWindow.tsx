import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faUndo, faTrashAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons'

import { ConfirmModalWindow } from './ConfirmModalWindow';
import NumberWithDescription from '../Inputs/NumberWithDescription';
import NumberWithButton from '../Inputs/NumberWithButton';
import { InputModalWindow } from './InputModalWindow';

import { AnyFunction } from '../../../types/common.types';
import { StashConfig } from '../../../types/app.types';

import './Modal.scss';
import './StashConfigModalWindow.scss';

interface StashConfigEdited extends StashConfig {
  deleted?: boolean;
  new?: boolean;
  oldName?: string;
}
interface Props {
  title: string;
  body: string;
  config: StashConfigEdited[];
  onConfirm: AnyFunction;
  onCancel: AnyFunction;
}

export function StashConfigModalWindow(props: Props) {

  const [show, setShow] = useState<boolean>(true);
  const [config, setConfig] = useState<StashConfigEdited[]>(props.config);
  const [addNewStash, openNewStashModal] = useState<boolean>(false);
  const [deleteStash, openDeleteStashModal] = useState<string | null>(null);
  const [editStash, openEditStashModal] = useState<string | null>(null);

  const defaultButton = useRef<HTMLButtonElement & Button<"button">>(null);

  useEffect(() => {
    if (show && defaultButton.current) defaultButton.current.focus();
  }, [show]);

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
    setConfig([...config, { cratesTotal: 0, name, new: true }])
    openNewStashModal(false);
  }

  const changeStashName = (newName: string, oldName: string) => {
    const changedConfig = config.map(
      stash => stash.name.toLocaleUpperCase() === oldName.toLocaleUpperCase()
        ? stash.oldName
          ? { ...stash, name: newName, }
          : { ...stash, oldName, name: newName, }
        : stash
    );
    setConfig(changedConfig);
    openEditStashModal(null);
  }

  const handleDeleteStashClick = (name: string, newStash: boolean = false) => {
    if (newStash) {
      setConfig([...config.filter(stash => !(stash.name === name))]);
    } else {
      openDeleteStashModal(name.toLocaleUpperCase());
    }
  }

  const handleRestoreStashClick = (name: string) => {
    setConfig(config.map(stash => stash.name === name ? { ...stash, deleted: false } : stash));
  }

  const handleEditStashClick = (name: string) => {
    openEditStashModal(name.toLocaleUpperCase());
  }

  const removeStash = (name: string) => {
    openDeleteStashModal(null);
    setConfig(config.map(stash => stash.name.toLocaleUpperCase() === name ? { ...stash, deleted: true } : stash));
  }

  return (
    <>
      <Modal show={show} onHide={handleClose} className={addNewStash || deleteStash || editStash ? 'modal--opaque' : ''}>
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal__body">
          <div className="modal__body__description">{props.body}</div>
          {(config || props.config).map(stash => (
            <div className="modal__body__description__line" key={stash.name}>
              <NumberWithDescription
                name={stash.name}
                disabled={stash.deleted}
                value={stash.cratesTotal}
                onChange={(value: string, name: string) => handleChange(value, name)} />
              {
                !stash.deleted
                  ? <>
                    <div className="stash-action-button" onClick={() => handleEditStashClick(stash.name)} title="Edit stash name">
                      <FontAwesomeIcon icon={faPencilAlt} />
                    </div>
                    <div className="stash-action-button" onClick={() => handleDeleteStashClick(stash.name, stash.new)} title="Delete stash">
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </div>
                  </>
                  : <div className="stash-action-button" onClick={() => handleRestoreStashClick(stash.name)} title="Restore stash">
                    <FontAwesomeIcon icon={faUndo} />
                  </div>
              }
              {stash.oldName && stash.oldName !== stash.name.toLocaleUpperCase() ? <span>{`(previously ${stash.oldName})`}</span> : null}

            </div>
          ))}

          <NumberWithButton name=" Add new stash" onClick={() => openNewStashModal(true)}>
            <FontAwesomeIcon icon={faPlusCircle} />
          </NumberWithButton>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="primary" onClick={handleConfirm} ref={defaultButton}>Confirm</Button>
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
      {
        editStash
          ? <InputModalWindow
            title={"Edit Stash Name"}
            body={`Please enter new name for your stash:`}
            onConfirm={(value: string) => changeStashName(value, editStash)}
            onCancel={() => openEditStashModal(null)}
          />
          : null
      }
      {
        deleteStash
          ? <ConfirmModalWindow
            title={"Delete Stash"}
            body={`Are you sure you want to delete stash ${deleteStash}? 
            If it have any items they will also be removed!`}
            onConfirm={() => removeStash(deleteStash)}
            onCancel={() => openDeleteStashModal(null)}
          ></ConfirmModalWindow>
          : null
      }
    </>
  );
}
