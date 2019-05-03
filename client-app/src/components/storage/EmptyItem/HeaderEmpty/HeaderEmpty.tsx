import * as React from 'react';
import { EmptyBatch } from '../../../../types/storage.types';

import './HeaderEmpty.scss';

// tslint:disable no-any

interface PropsAction {
  onInputChange: any;
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
    let currentDate = new Date().toISOString();
    currentDate = currentDate.slice(0, currentDate.indexOf('T'));

    return (
      <div className="empty-heading">
        <div className="col-3">
          <input
            type="text"
            name="batchNo"
            value={this.props.batchNo}
            placeholder="#Number*"
            // placeholder={this.state.batchId.toString()}
            className="empty-heading__input"
            onChange={this.handleChange}
          />
        </div>
        <div className="col-6">
          <input
            type="text"
            name="name"
            value={this.props.name}
            // placeholder={this.state.name}
            placeholder="Batch Name*"
            className="empty-heading__input"
            onChange={this.handleChange}
          />
        </div>
        <div className="col-3">
          <input
            type="text"
            name="bottledOn"
            value={this.props.bottledOn.toString()}
            // placeholder={this.state.bottledOn}
            placeholder={`${currentDate}*`}
            className="empty-heading__input"
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}

export default EmptyHeaderComponent;
