import * as React from 'react';

import { Stash } from '../../../../types/storage.types';
import { AnyFunction } from '../../../../types/common.types';
import { StashesHeaderComponent } from './StashesHeader/StashesHeader';
import { StashesItemComponent } from './StashesItem/StashesItem';

interface Props {
  stashes: Stash[];
  onQuantityChange: AnyFunction;
  onQuantitySelection: AnyFunction;
  onStashDelete: AnyFunction;
}

export class StashesComponent extends React.Component<Props> {
  public render() {
    return (
      <div className={'col-md-6  col-xs-12 quantity'}>
        {this.props.stashes.length > 0 && (
          <StashesHeaderComponent {...this.props.stashes[0].items} />
        )}
        {this.props.stashes.map((stash, index) => (
          <StashesItemComponent
            key={index}
            stash={stash}
            stashKey={index}
            onQuantityChange={this.props.onQuantityChange}
            onQuantitySelection={this.props.onQuantitySelection}
            onStashDelete={this.props.onStashDelete}
          />
        ))}
      </div>
    );
  }
}

export default StashesComponent;
