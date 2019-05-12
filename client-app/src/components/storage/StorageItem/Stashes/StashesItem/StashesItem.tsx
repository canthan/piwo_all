import * as React from 'react';

import { QuantityStorage } from '../../../../../types/storage.types';

export class StashesItemComponent extends React.Component<QuantityStorage, {}> {

  public onQuantitySelection = (e: React.MouseEvent<HTMLInputElement>, name: string, stashKey: number) => {
    const input = e.target as HTMLInputElement;
    const node = input && input.parentElement && input.parentElement.parentElement as HTMLInputElement;
    const elements: HTMLCollectionOf<Element> | null = node && node.getElementsByClassName('quantity__input');

    if (elements) {
      Array.from(elements).forEach(element => {
        element.classList.remove('selected');
      });
    }

    input.classList.add('selected');
    this.props.onQuantitySelection(e, name, stashKey);
  };

  public onQuantityChange = (name: string, stashKey: number, e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onQuantityChange(name, stashKey, e.target as HTMLInputElement);
  };

  public removeStash = () => {
    this.props.onStashDelete(this.props.stash.userId, this.props.stash.stashId);
  }

  public render() {
    return (
      <div className="row quantity__row">
        <div className="col-4 quantity__caption">
          <span>{this.props.stash.name}</span>
        </div>
        {Object.values(this.props.stash.items).map((item, index) => {
          const name = Object.keys(this.props.stash.items)[index];

          return (
            <input
              className="col-2 form-control quantity__input"
              key={index}
              type="text"
              name={name}
              value={item ? item : 0}
              onClick={(e: React.MouseEvent<HTMLInputElement>) =>
                this.onQuantitySelection(e, name, this.props.stashKey)
              }
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                this.onQuantityChange(name, this.props.stashKey, e)
              }
            />
          );
        })}
        <div className="button-wrapper">
          <button className="remove-button"
            type="button"
            onClick={() => this.removeStash()}
          >&#10007;</button>
        </div>
      </div>
    );
  }
}
