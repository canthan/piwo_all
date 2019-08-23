import * as React from 'react';
import dayjs from 'dayjs';

import { EmptyBatch } from '../../../../types/storage.types';
import { AnyFunction } from '../../../../types/common.types';
import { DEFAULT_DATE_FORMAT } from '../../../../types/storage.constants';

import './HeaderEmpty.scss';

interface PropsAction {
  onInputChange: AnyFunction;
}

type Props = PropsAction & EmptyBatch;

export function EmptyHeaderComponent(props: Props) {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const changedValue = { [e.target.name]: e.target.value };
    props.onInputChange(changedValue);
  };
  const currentDate = dayjs().format(DEFAULT_DATE_FORMAT);

  return (
    <div className="empty-heading">
      <div className="col-3 empty-heading__wrapper">
        <label className="empty-heading__label required">Batch Number</label>
        <input
          type="text"
          name="batchNo"
          value={props.batchNo}
          placeholder="#Number*"
          className="empty-heading__input form-control"
          onChange={handleChange}
        />
      </div>
      <div className="col-6 empty-heading__wrapper">
        <label className="empty-heading__label required">Batch Name</label>
        <input
          type="text"
          name="name"
          value={props.name}
          placeholder="Batch Name*"
          className="empty-heading__input form-control"
          onChange={handleChange}
        />
      </div>
      <div className="col-3 empty-heading__wrapper">
        <label className="empty-heading__label required">Bottling Date</label>
        <input
          type="text"
          name="bottledOn"
          value={props.bottledOn.toString()}
          placeholder={`${currentDate}*`}
          className="empty-heading__input form-control"
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default EmptyHeaderComponent;
