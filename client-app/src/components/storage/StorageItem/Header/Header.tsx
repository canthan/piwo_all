import * as React from 'react';
import './Header.scss';

export interface Props {
	bottledOn: string;
	batchNumber: string;
	batchName: string;
}

// tslint:disable function-name
export function HeaderComponent(props: Props) {
	const currentDate = new Date();
	const bottlingDate = new Date(props.bottledOn);

	const age = currentDate.getTime() - bottlingDate.getTime();

	return (
		<h3 className="heading">
			<span className="col-3">#{props.batchNumber}</span>
			<span className="col-6">{props.batchName}</span>
			<div className="col-3 heading__dates">
				<span>bottled: {props.bottledOn}</span>
				<span>
					{getDaysFromMiliseconds(age)} days ({getWeeksFromMiliseconds(age)}{' '}
					weeks)
				</span>
			</div>
		</h3>
	);
}

const MILISEC_PER_DAY = 86400000;
const MILISEC_PER_WEEK = 604800000;

function getDaysFromMiliseconds(miliseconds: number) {
	return Math.round(miliseconds / MILISEC_PER_DAY);
}

function getWeeksFromMiliseconds(miliseconds: number) {
	return Math.round(miliseconds / MILISEC_PER_WEEK);
}

export default HeaderComponent;
