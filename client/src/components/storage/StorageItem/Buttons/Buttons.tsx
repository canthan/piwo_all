import * as React from 'react';
import { Buttons } from '../../../../types/storage.types';

export class ButtonsComponent extends React.Component<Buttons, {}> {
	constructor(props) {
		super(props);
	}

	public render() {
		return (
			<div className="col-md-4 col-xs-12 buttons">
				<div className="container buttons-row align-items-center">
					{this.props.increase.map((value, index) => (
						<IncreaseButton
							key={index}
							value={value}
							onQuantityChangeButton={this.props.onQuantityChangeButton}
						/>
					))}
				</div>
				<div className="container buttons-row align-items-center">
					{this.props.decrease.map((value, index) => (
						<DecreaseButton
							key={index}
							value={value}
							onQuantityChangeButton={this.props.onQuantityChangeButton}
						/>
					))}
				</div>
			</div>
		);
	}
}

// tslint:disable function-name
function IncreaseButton(props) {
	return (
		<button
			className="btn btn__plus"
			onClick={() => props.onQuantityChangeButton(props.value)}
		>
			+{props.value}
		</button>
	);
}

function DecreaseButton(props) {
	return (
		<button
			className="btn btn__minus"
			onClick={() => props.onQuantityChangeButton(props.value)}
		>
			{props.value}
		</button>
	);
}

export default ButtonsComponent;
