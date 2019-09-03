import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

import { AnyFunction } from '../../../../types/common.types';

import '../Summary.scss';

interface Props {
  caption: string;
  shown: boolean;
  onClick: AnyFunction
}

export const SummaryToggle = (props: Props) => {
  return (
    <div className="summary__toggle">
      <div className="container summary__line">
        <div className="summary__line__button" onClick={props.onClick}>
          {props.caption + ' '}
          {
            props.shown
              ? <FontAwesomeIcon icon={faCaretUp} size="lg"></FontAwesomeIcon>
              : <FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon>
              }
        </div>
      </div>
    </div>
  );
};
