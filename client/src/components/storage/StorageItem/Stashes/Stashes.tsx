import * as React from 'react';
import {
	Stash,
	Bottles,
	QuantityStorage,
} from '../../../../types/storage.types';

interface Props {
	stashes: Stash[];
	onQuantityChange;
	onQuantitySelection;
}

export class StashesComponent extends React.Component<Props> {
	public render() {
		return (
			<div className={'col-md-6  col-xs-12 quantity'}>
				{this.props.stashes.length > 0 && (
					<QuantityHeaderComponent {...this.props.stashes[0].items} />
				)}
				{this.props.stashes.map((stash, index) => (
					<QuantityStorageComponent
						key={index}
						stash={stash}
						stashKey={index}
						onQuantityChange={this.props.onQuantityChange}
						onQuantitySelection={this.props.onQuantitySelection}
					/>
				))}
			</div>
		);
	}
}

// tslint:disable function-name
function QuantityHeaderComponent(props: Bottles) {
	return (
		<div className="row">
			<div className="col-4" />
			{Object.keys(props).map((item, index) => (
				<div className="col-2 quantity__volume" key={index}>
					{DecodeVolume(item)}
				</div>
			))}
		</div>
	);
}

function DecodeVolume(volume: string) {
	const VOLUME_DIVIDER = 100;

	return Number(volume.slice(1)) / VOLUME_DIVIDER;
}

// tslint:disable max-classes-per-file
class QuantityStorageComponent extends React.Component<QuantityStorage, {}> {
	public onQuantitySelection = (e, name, stashKey) => {
		const node = e.target.parentNode.parentNode;
		const elements = node.getElementsByClassName('quantity__input');

		for (let i = 0; i < elements.length; i += 1) {
			elements.item(i).classList.remove('selected');
		}

		e.target.classList.add('selected');
		this.props.onQuantitySelection(e, name, stashKey);
	};

	public onQuantityChange = (name, stashKey, target) => {
		this.props.onQuantityChange(name, stashKey, target);
	};

	public render() {
		return (
			<div className="row quantity__row">
				<div className="col-4 quantity__caption">
					<span>{this.props.stash.stashName}</span>
				</div>
				{Object.values(this.props.stash.items).map((item, index) => {
					const name = Object.keys(this.props.stash.items)[index];

					return (
						<input
							className="col-2 form-control quantity__input"
							key={index}
							type="text"
							name={name}
							value={item ? item : 0}
							onClick={e =>
								this.onQuantitySelection(e, name, this.props.stashKey)
							}
							onChange={e =>
								this.onQuantityChange(name, this.props.stashKey, e.target)
							}
						/>
					);
				})}
			</div>
		);
	}
}

export default StashesComponent;
