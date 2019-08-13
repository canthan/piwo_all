import * as React from 'react';

import { Bottle } from '../../../../../types/storage.types';

interface Props {
  bottles: Bottle[];
}

export function StashesHeaderComponent(props: Props) {
  return (
    <div className="row">
      <div className="col-4" />
      {props.bottles.map((item, index) => (
        <div className="col-2 quantity__volume" key={index}>
          {item.volume}
        </div>
      ))}
    </div>
  );
}
