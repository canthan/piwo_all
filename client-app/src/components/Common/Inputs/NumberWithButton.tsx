import React from 'react';

import { OptionsButton } from '../OptionsButton/OptionsButton';
import { AnyFunction } from '../../../types/common.types';

import './NumberInput.scss';

interface OwnProps {
  name: string;
  onClick: AnyFunction;
  disabled?: boolean;
  onChange?: AnyFunction;
  value?: number;
  min?: number;
  max?: number;
}

type Props = OwnProps & Partial<JSX.ElementChildrenAttribute>;

const NumberWithButton = (props: Props) => {
  return (
    <div className="number-input__line">
      <input type="number"
        min={props.min || 0}
        max={props.max || 9999}
        disabled={props.disabled || true}
        className="form-control number-input__line__input"
        value={props.value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.onChange ? props.onChange(e.target.value, props.name) : null}
      ></input>
      <OptionsButton
        role={props.name}
        onButtonClick={() => props.onClick()}
      >
        {props.children}
      </OptionsButton>
    </div>
  );
};

export default NumberWithButton;
