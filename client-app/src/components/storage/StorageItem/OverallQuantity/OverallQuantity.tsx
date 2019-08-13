import React, { useState, useEffect }  from 'react';

import { getHalfLiterBottleAmount, getSmallBottleAmount, getLitres } from '../../common.service';

import { Stash } from '../../../../types/storage.types';
import { BOTTLES_IN_CRATE } from '../../../../types/storage.constants';

interface Props {
	stashes: Stash[];
}

export const OverallQuantityComponent = (props: Props) => {

  const [litres, setLitres] = useState(0);
  const [crates, setCrates] = useState(0);
  const [bottles, setBottles] = useState('0');

  useEffect(() => {
    const halfLiterBottles = getHalfLiterBottleAmount(props.stashes);
    const smallBottles = getSmallBottleAmount(props.stashes);

    setLitres(getLitres(props.stashes));
    setCrates(halfLiterBottles/BOTTLES_IN_CRATE);
    setBottles(smallBottles ? `${halfLiterBottles} + ${smallBottles}` : `${halfLiterBottles}`);
  })

		return (
			<div className="col-md-2 col-xs-12 overall">
				<ul className="overall__list">
					<li>
						<span className="overall__list__number">{litres.toFixed(1)}</span> Litres
					</li>
					<li>
						<span className="overall__list__number">{crates.toFixed(1)}</span> Crates
					</li>
					<li>
						<span className="overall__list__number">{bottles}</span> Bottles
					</li>
				</ul>
			</div>
		);
}

export default OverallQuantityComponent;
