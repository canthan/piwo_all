import * as React from 'react';

import { MILISEC_PER_DAY, MILISEC_PER_WEEK } from '../../../../types/storage.constants';
import { getCurrentDate, dateInStandardFormat } from '../../../../utils/utils.service';

import './Header.scss';

export interface Props {
	bottledOn: Date;
	batchNo: string;
	name: string;
}

export const HeaderComponent = (props: Props) => {
	const currentDate = getCurrentDate();
	const age = currentDate.getTime() - props.bottledOn.getTime();

	return (
		<h3 className="heading">
			<span className="col-3">#{props.batchNo}</span>
			<span className="col-6">{props.name}</span>
			<div className="col-3 heading__dates">
				<span>bottled: {dateInStandardFormat(props.bottledOn)}</span>
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
