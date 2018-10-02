import * as React from 'react';
import * as ReactDOM from 'react-dom';

import '../Summary.scss';

function StorageSummaryHeaderComponent() {
  const headers = [
    'Storage name',
    'Overall litres',
    'Overall crates',
    'Crates empty',
    'Crates full',
    '0,5l bottles',
    'Small bottles',
  ];
  return (
    <div className='container summary'>
      <ul className='col-3 col-md-12 summary__list justify-content-around'>
        {headers.map((header, index) => {
          return <li className='col-12 col-md-1' key={index}>{header}</li>;
        })}
      </ul>
    </div>
  );
}

export default StorageSummaryHeaderComponent;
