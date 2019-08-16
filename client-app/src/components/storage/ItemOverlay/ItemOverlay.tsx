import * as React from 'react';
import { GridLoader } from 'react-spinners';

import './ItemOverlay.scss';

type Props = Partial<JSX.ElementChildrenAttribute>;

export function ItemOverlay(props: Props) {
  return (
    <div className="col-xl-6 col-xs-12">
      <div className="itemOverlay">
        <div className="item">
          {props.children
            ? <div>{props.children}</div>
            : <>
              <h3>Loading batch...</h3>
              <div className="item__loader">
                <GridLoader color={"#2e2e2e"} size={12}>
                  <span>Loading...</span>
                </GridLoader>
              </div>
            </>
          }
        </div>
      </div>
    </div>
  )
}
