import React from 'react';

import { AnyFunction } from '../../../types/common.types';

import './OptionsButton.scss';

interface Props {
  disabled: boolean,
  role: string,
  size?: string,
  onButtonClick: AnyFunction;
}

export function OptionsButton(props: Props) {
  return (
    <div className="options-button">
      <button
        className={`btn btn__options ${props.size}`}
        onClick={() => props.onButtonClick()}
        disabled={props.disabled}
      >
        {props.role}
      </button>
    </div>
  );
}
