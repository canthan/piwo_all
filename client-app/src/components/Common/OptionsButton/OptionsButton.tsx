import React from 'react';

import { AnyFunction } from '../../../types/common.types';

import './OptionsButton.scss';

interface OwnProps {
  role: string,
  onButtonClick: AnyFunction;
  disabled?: boolean,
  size?: string,
}

type Props = OwnProps & Partial<JSX.ElementChildrenAttribute>;

export function OptionsButton(props: Props) {
  return (
    <div className="options-button">
      <button
        className={`btn btn__options ${props.size}`}
        onClick={() => props.onButtonClick()}
        disabled={props.disabled || false}
      >
        {props.children}
        {props.role}
      </button>
    </div>
  );
}
