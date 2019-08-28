import React from 'react';

import { AnyFunction } from '../../../types/common.types';

import './NumberInput.scss';

interface Props {
  name: string;
  value: number;
  onChange: AnyFunction;
  min?: number;
  max?: number;
  disabled?: boolean;
}

const NumberWithDescription = (props: Props) => {
  return (
    <div className="number-input__line">
      <input type="number"
        min={props.min || 0}
        max={props.max || 9999}
        disabled={props.disabled || false}
        className="form-control number-input__line__input"
        value={props.value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.onChange(e.target.value, props.name)}
      ></input>
      <div className={props.disabled ? 'number-input__line__text--disabled' : 'number-input__line__text'}>{props.name.toUpperCase()}</div>
    </div>
  );
};

export default NumberWithDescription;
