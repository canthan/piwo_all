import * as React from 'react';

import { ChangeCountButtons } from '../../../../types/storage.types';
import { IncreaseButton } from '../../../Common/OptionsButton/IncreaseButton';
import { DecreaseButton } from '../../../Common/OptionsButton/DecreaseButton';

interface Props {
  increase: ChangeCountButtons,
  decrease: ChangeCountButtons,
};

export function ButtonsComponent(props: Props) {

  return (
    <div className="col-md-4 col-xs-12 buttons">
      <div className="container buttons-row align-items-center">
        {props.increase.values.map((value, index) => (
          <IncreaseButton
            key={index}
            value={value}
            onQuantityChangeButton={props.increase.onQuantityChangeButton}
          />
        ))}
      </div>
      <div className="container buttons-row align-items-center">
        {props.decrease.values.map((value, index) => (
          <DecreaseButton
            key={index}
            value={value}
            onQuantityChangeButton={props.increase.onQuantityChangeButton}
          />
        ))}
      </div>
    </div>
  );
}

export default ButtonsComponent;
