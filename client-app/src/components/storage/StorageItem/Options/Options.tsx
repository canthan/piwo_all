import * as React from 'react';

import './Options.scss';

export interface Props {
	buttons: string[];
	functions: {
		[buttonFunction: string]: object;
	};
	active: {
		[buttonFunction: string]: boolean;
	};
}

// tslint:disable function-name
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

// tslint:disable no-any

function OptionsButton(props: any) {
	return (
		<button
			className="btn btn__options"
			onClick={() => props.onButtonClick()}
			disabled={props.disabled}
		>
			{props.role}
		</button>
	);
}

export default OptionsComponent;
