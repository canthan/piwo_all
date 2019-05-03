import * as React from 'react';
import './Header.scss';
import { MILISEC_PER_DAY, MILISEC_PER_WEEK } from '../../../../types/storage.constants';

export interface Props {
	bottledOn: Date;
	batchNo: string;
	name: string;
}

// tslint:disable function-name
export function HeaderComponent(props: Props) {
	const currentDate = new Date();
	const age = currentDate.getTime() - props.bottledOn.getTime();

	return (
		<h3 className="heading">
			<span className="col-3">#{props.batchNo}</span>
			<span className="col-6">{props.name}</span>
			<div className="col-3 heading__dates">
				<span>bottled: {props.bottledOn.toLocaleDateString()}</span>
				<span>
					{getDaysFromMiliseconds(age)} days ({getWeeksFromMiliseconds(age)}{' '}
					weeks)
				</span>
			</div>
		</h3>
	);
}

function getDaysFromMiliseconds(miliseconds: number) {
	return Math.round(miliseconds / MILISEC_PER_DAY);
}

function getWeeksFromMiliseconds(miliseconds: number) {
	return Math.round(miliseconds / MILISEC_PER_WEEK);
}

export default HeaderComponent;
