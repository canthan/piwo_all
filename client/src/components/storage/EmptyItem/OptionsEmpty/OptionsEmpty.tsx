import * as React from 'react';
import { Options } from '../../../../types/storage.types';

import './OptionsEmpty.scss';

// tslint:disable function-name
export function EmptyOptionsComponent(props: Options) {
	return (
		<div className="col-12 empty-option-buttons justify-content-center">
			{props.buttons.map((button, index) => {
				const role = button.split(' ').join('');

				return (
					<OptionsButton
						key={index}
						role={button}
						onButtonClick={props.functions[role]}
					/>
				);
			})}
		</div>
	);
}

function OptionsButton(props) {
	return (
		<button
			className="btn btn__new_batch btn-extra-lg btn-lg"
			onClick={() => props.onButtonClick()}
		>
			{props.role}
		</button>
	);
}

export default EmptyOptionsComponent;
