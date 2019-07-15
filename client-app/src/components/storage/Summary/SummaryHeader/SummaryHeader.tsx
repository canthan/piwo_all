import * as React from 'react';

import { SummaryHeaders } from '../summary.consts';

import '../Summary.scss';

function StorageSummaryHeaderComponent() {
  return (
    <div className='container summary'>
      <ul className='col-3 col-md-12 summary__list justify-content-around'>
        {Object.values(SummaryHeaders).map(header => {
          return <li className='col-12 col-md-1' key={header}>{header}</li>;
        })}
      </ul>
    </div>
  );
}

export default StorageSummaryHeaderComponent;
