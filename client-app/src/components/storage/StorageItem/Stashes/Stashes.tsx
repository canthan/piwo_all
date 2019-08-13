import React from 'react';

import { StashesHeaderComponent } from './StashesHeader/StashesHeader';
import { StashesItemComponent } from './StashesItem/StashesItem';

import { Stash } from '../../../../types/storage.types';
import { AnyFunction } from '../../../../types/common.types';

interface Props {
  stashes: Stash[];
  onQuantityChange: AnyFunction;
  onQuantitySelection: AnyFunction;
  onStashDelete: AnyFunction;
}

export function StashesComponent(props: Props) {

  return (
    <div className={'col-md-6  col-xs-12 quantity'}>
      <StashesHeaderComponent bottles={props.stashes[0] ? props.stashes[0].items : []} />
      {props.stashes.map((stash, index) => (
        <StashesItemComponent
          key={index}
          stash={stash}
          stashKey={index}
          onQuantityChange={props.onQuantityChange}
          onQuantitySelection={props.onQuantitySelection}
          onStashDelete={props.onStashDelete}
        />
      ))}
    </div>
  );
}

export default StashesComponent;
