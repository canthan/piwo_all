import * as React from 'react';
import { Options } from '../../../../types/storage.types';

import './OptionsEmpty.scss';
import { OptionsButton } from '../../../Common/OptionsButton/OptionsButton';

type Props = Options;

export function EmptyOptionsComponent(props: Props) {
  return (
    <div className="col-12 empty-option-buttons justify-content-center">
      {props.buttons.map((button, index) => {
        const role = button.split(' ').join('');

        return (
          <OptionsButton
            disabled={false}
            key={index}
            role={button}
            size="btn-extra-lg btn-lg"
            onButtonClick={props.functions[role]}
          />
        );
      })}
    </div>
  );
}

export default EmptyOptionsComponent;
