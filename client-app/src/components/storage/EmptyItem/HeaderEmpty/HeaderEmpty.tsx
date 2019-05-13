import * as React from 'react';
import dayjs from 'dayjs';

import { EmptyBatch } from '../../../../types/storage.types';
import { AnyFunction } from '../../../../types/common.types';
import { DEFAULT_DATE_FORMAT } from '../../../../types/storage.constants';

import './HeaderEmpty.scss';

interface PropsAction {
  onInputChange: AnyFunction;
}

interface Event {
  target: { 
    name: string; 
    value: string;
  }
}

type Props = PropsAction & EmptyBatch;

export class EmptyHeaderComponent extends React.Component<Props> {
  public handleChange = (e: Event ) => {
    const changedValue = { [e.target.name]: e.target.value };
    this.props.onInputChange(changedValue);
  };

  public render() {
    const currentDate = dayjs().format(DEFAULT_DATE_FORMAT);

    return ( 
      <div className="empty-heading">
        <div className="col-3 empty-heading__wrapper">
          <label className="empty-heading__label required">Batch Number</label>
          <input
            type="text"
            name="batchNo"
            value={this.props.batchNo}
            placeholder="#Number*"
            className="empty-heading__input form-control"
            onChange={this.handleChange}
          />
        </div>
        <div className="col-6 empty-heading__wrapper">
          <label className="empty-heading__label required">Batch Name</label>
          <input
            type="text"
            name="name"
            value={this.props.name}
            placeholder="Batch Name*"
            className="empty-heading__input form-control"
            onChange={this.handleChange}
          />
        </div>
        <div className="col-3 empty-heading__wrapper">
          <label className="empty-heading__label required">Bottling Date</label>
          <input
            type="text"
            name="bottledOn"
            value={this.props.bottledOn.toString()}
            placeholder={`${currentDate}*`}
            className="empty-heading__input form-control"
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}

export default EmptyHeaderComponent;
