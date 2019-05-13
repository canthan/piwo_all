import React from 'react';

import { OptionsButton } from '../../../Common/OptionsButton/OptionsButton';
import { AnyFunction } from '../../../../types/common.types';

import './Options.scss';

export interface Props {
	buttons: string[];
	functions: {
		[buttonFunction: string]: AnyFunction;
	};
	active: {
		[buttonFunction: string]: boolean;
	};
}

export function OptionsComponent(props: Props) {
	return (
		<div className="col-12 option-buttons justify-content-center">
			{props.buttons.map((button, index) => {
				const role = button.split(' ').join('');

				return (
					<OptionsButton
						key={index}
						role={button}
						onButtonClick={props.functions[role]}
						disabled={props.active[role]}
					/>
				);
			})}
		</div>
	);
}

export default OptionsComponent;
