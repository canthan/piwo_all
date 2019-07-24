import React from 'react';

import banan from '../../../assets/images/banan.png';
import { ErrorMessages } from '../../../constants/text.constants';

export const NotFound = () => {
  return (
    <div style={{paddingTop: "30px"}}>
      <h3>{ErrorMessages.pageNotFound}</h3>
      <img src={banan} alt="monkey passed away..."></img>
    </div>
  )
}