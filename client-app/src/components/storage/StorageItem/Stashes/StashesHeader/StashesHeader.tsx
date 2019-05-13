import * as React from 'react';

import { Bottles } from '../../../../../types/storage.types';
import { UtilsService } from '../../../../../utils/utils.service';

export function StashesHeaderComponent(props: Bottles) {
  return (
    <div className="row">
      <div className="col-4" />
      {Object.keys(props).map((item, index) => (
        <div className="col-2 quantity__volume" key={index}>
          {UtilsService.decodeVolume(item)}
        </div>
      ))}
    </div>
  );
}
