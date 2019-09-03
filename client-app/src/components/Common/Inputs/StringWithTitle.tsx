import React, { useState, useEffect } from 'react';

import { AnyFunction } from '../../../types/common.types';

import './StringInput.scss';

interface Props {
  name: string;
  caption: string;
  value: string;
  onChange: AnyFunction;
  min?: number;
  max?: number;
  forbibben?: string[];
  caseSensitive?: boolean;
  canBeEmpty?: boolean;
  disabled?: boolean;
  errorText?: string;
}

export const StringWithTitle = (props: Props) => {
  const { caseSensitive = false, canBeEmpty = false } = props;

  const [valid, checkValidity] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  const handleValidity = (value: string) => {
    if (props.forbibben) {
      checkValidity(value !== '' && caseSensitive
        ? !props.forbibben.includes(value)
        : !props.forbibben.find(name => name.toLocaleUpperCase() === value.toLocaleUpperCase())
      );
    } else if (!canBeEmpty) {
      checkValidity(value !== '');
    } else {
      checkValidity(true);
    }
  }

  useEffect(() => props.onChange(value, valid, props.name), [valid, value])

  return (
    <div className="string-input__container">
      <div>{props.caption}</div>
      <input type="text"
        min={props.min || 0}
        max={props.max || 9999}
        disabled={props.disabled || false}
        className="form-control string-input__line__input"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setValue(e.target.value);
          handleValidity(e.target.value);
        }
        }
      ></input>
      <div className="error-text">{
        !valid
          ? !value
            ? canBeEmpty
              ? null
              : <span>Field cannot be empty</span>
            : <span>{props.errorText}</span>
          : null
      }</div>
    </div>
  );
};
