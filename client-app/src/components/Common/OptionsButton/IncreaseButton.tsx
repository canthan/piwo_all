import React from 'react';

import { SingleChangeCountButtons } from '../../../types/storage.types';

type Props = SingleChangeCountButtons;

export function IncreaseButton(props: Props) {
	return (
		<button
			className="btn btn__plus"
			onClick={() => props.onQuantityChangeButton(props.value)}
		>
			+{props.value}
		</button>
	);
}
