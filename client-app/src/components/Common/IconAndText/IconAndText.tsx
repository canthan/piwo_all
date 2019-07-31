import React from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { AnyFunction } from '../../../types/common.types';

import './IconAndText.scss';
import '../../../styles/colors.scss';

interface Config {
  iconFirst: boolean;
  fontSize: string;
  color: string;
}

interface Props {
  text: string;
  icon: IconDefinition;
  onClick: AnyFunction;
  config: Config;
}

export const defaultIconAndTextConfig: Config = {
  iconFirst: true,
  fontSize: '$font-size-bigger',
  color: 'white',
}

export const IconAndText = (props: Props) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    props.onClick(e);
  }

  return (
    <div
      className={`icon-and-text ${props.config.iconFirst ? 'icon-and-text--normal' : 'icon-and-text--reversed'}`}
      onClick={handleClick}
      style={{
        color: props.config.color,
        fontSize: props.config.fontSize,
      }}>
      <div className="icon-and-text__name" >
        <span>{props.text}</span>
      </div>
      <div className="icon-and-text__icon">
        <FontAwesomeIcon icon={props.icon} />
      </div>
    </div>
  );
};
