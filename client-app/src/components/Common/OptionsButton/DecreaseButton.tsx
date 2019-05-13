import React from 'react';

import { SingleChangeCountButtons } from '../../../types/storage.types';

type Props = SingleChangeCountButtons;

export function DecreaseButton(props: Props) {
	return (
		<button
			className="btn btn__minus"
			onClick={() => props.onQuantityChangeButton(props.value)}
		>
			{props.value}
		</button>
	);
}
