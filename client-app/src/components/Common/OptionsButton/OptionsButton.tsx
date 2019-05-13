import React from 'react';

import { AnyFunction } from '../../../types/common.types';

import './OptionsButton.scss';

interface Props {
  disabled: boolean,
  role: string,
  onButtonClick: AnyFunction;
}

export function OptionsButton(props: Props) {
  return (
    <div className="options-button">
      <button
        className="btn btn__options"
        onClick={() => props.onButtonClick()}
        disabled={props.disabled}
      >
        {props.role}
      </button>
    </div>
  );
}
