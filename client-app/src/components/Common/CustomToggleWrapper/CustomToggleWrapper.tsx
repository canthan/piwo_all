import React from 'react';

import { AnyFunction } from '../../../types/common.types';

interface Props {
  onClick: AnyFunction
}

export class CustomToggleWrapper extends React.Component<Props> {
  constructor(props: Props, context: any) {
    super(props, context);
  }

  handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    this.props.onClick(e);
  }

  render() {
    return (
      <div onClick={this.handleClick}>
        {this.props.children}
      </div>
    );
  }
}
