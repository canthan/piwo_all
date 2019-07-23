import React from 'react';

import './ErrorText.scss';

interface Props {
  message: string,
};

export function ErrorText(props: Props) {
  return (
    <div className="error-message">
      <span className="error-message__text">
        {props.message}
      </span>
    </div>
  )
}
