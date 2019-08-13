import React, { useState } from 'react';

import { QuantityStorage } from '../../../../../types/storage.types';
import { ConfirmModalWindow } from '../../../../Common/Modals/ConfirmModalWindow';

type Props = QuantityStorage;

export function StashesItemComponent(props: Props) {

  const [modal, setModal] = useState(false);

  const onQuantitySelection = (e: React.MouseEvent<HTMLInputElement>, name: string, stashKey: number) => {
    const input = e.target as HTMLInputElement;
    const node = input && input.parentElement && input.parentElement.parentElement as HTMLInputElement;
    const elements: HTMLCollectionOf<Element> | null = node && node.getElementsByClassName('quantity__input');

    if (elements) {
      Array.from(elements).forEach(element => {
        element.classList.remove('selected');
      });
    }

    input.classList.add('selected');
    props.onQuantitySelection(e, name, stashKey);
  };

  const onQuantityChange = (name: string, stashKey: number, e: React.ChangeEvent<HTMLInputElement>) => {
    props.onQuantityChange(name, stashKey, e.target as HTMLInputElement);
  };

  const removeStash = () => {
    setModal(false);
    props.onStashDelete(props.stash.userId, props.stash.stashId);
  }

  return (
    <>
      <div className="row quantity__row">
        <div className="col-4 quantity__caption">
          <span>{props.stash.name}</span>
        </div>
        {Object.values(props.stash.items).map((item, index) => {
          const name = Object.keys(props.stash.items)[index];

          return (
            <input
              className="col-2 form-control quantity__input"
              key={index}
              type="text"
              name={name}
              value={item.amount ? item.amount : 0}
              onClick={(e: React.MouseEvent<HTMLInputElement>) =>
                onQuantitySelection(e, name, props.stashKey)
              }
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onQuantityChange(name, props.stashKey, e)
              }
            />
          );
        })}
        <div className="button-wrapper">
          <button className="remove-button"
            type="button"
            onClick={() => setModal(true)}
          >&#10007;</button>
        </div>
      </div>

      {
        modal
          ? <ConfirmModalWindow
            title={"Delete Stash"}
            body={`Are you sure you want to delete stash ${props.stash.name}?`}
            onConfirm={() => removeStash()}
            onCancel={() => setModal(false)}
          ></ConfirmModalWindow>
          : null
      }
    </>
  );
}
