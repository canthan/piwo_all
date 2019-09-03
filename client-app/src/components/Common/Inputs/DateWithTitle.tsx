import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';

import { AnyFunction } from '../../../types/common.types';
import { DEFAULT_DATE_FORMAT } from '../../../types/storage.constants';

import './StringInput.scss';
import './DateInput.scss';

interface Props {
  name: string;
  caption: string;
  value: Date;
  onChange: AnyFunction;
  min?: Date;
  max?: Date;
  disabled?: boolean;
  errorText?: string;
}

export const DateWithTitle = (props: Props) => {

  const [valid, checkValidity] = useState<boolean>(true);
  const [date, setDate] = useState<Date>(dayjs().toDate());

  const handleValidity = (value: Date) => {
    let retunedDate = dayjs(value).year() === 1 ? date : value;

    if (props.max && dayjs(value).isAfter(props.max)) retunedDate = props.max;
    if (props.min && dayjs(value).isBefore(props.min)) retunedDate = props.min;

    checkValidity(true);

    return retunedDate
  }

  useEffect(() => props.onChange(date, valid, props.name), [valid, date])

  return (
    <div className="string-input__container">
      <div>{props.caption}</div>
      <input type="date"
        disabled={props.disabled || false}
        className="form-control string-input__line__input"
        value={dayjs(date).format(DEFAULT_DATE_FORMAT)}
        min={props.min ? dayjs(props.min).format(DEFAULT_DATE_FORMAT) : ""}
        max={props.max ? dayjs(props.max).format(DEFAULT_DATE_FORMAT) : ""}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (e.target.valueAsDate) {
            const changedDate = handleValidity(e.target.valueAsDate);
            setDate(changedDate);
          }
        }
        }
      ></input>
      <div className="error-text">{
        !valid
          ? <span>{props.errorText}</span>
          : null
      }</div>
    </div>
  );
};
