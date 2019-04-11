import * as React from 'react';
import { CommonStorageService } from '../../common.service';
import { Stash } from '../../../../types/storage.types';

interface Props {
	stashes: Stash[];
}

interface State {
	litres: string;
	crates: string;
	bottles: string;
}

export class OverallQuantityComponent extends React.Component<Props, State> {
	public state = {
		litres: '0.00',
		crates: '0.00',
		bottles: '0',
	};
	public componentWillReceiveProps(nextProps: Props) {
		const {
			litres,
			crates,
			bottles,
		} = CommonStorageService.getOverallQuantities(nextProps.stashes);
		this.setState({
			litres,
			crates,
			bottles,
		});
	}
	public render() {
		const { litres, crates, bottles } = this.state;

		return (
			<div className="col-md-2 col-xs-12 overall">
				<ul className="overall__list">
					<li>
						<span className="overall__list__number">{litres}</span> Litres
					</li>
					<li>
						<span className="overall__list__number">{crates}</span> Crates
					</li>
					<li>
						<span className="overall__list__number">{bottles}</span> Bottles
					</li>
				</ul>
			</div>
		);
	}
}

export default OverallQuantityComponent;
