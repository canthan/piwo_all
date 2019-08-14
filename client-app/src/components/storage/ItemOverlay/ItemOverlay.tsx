import * as React from 'react';
import { ClimbingBoxLoader } from 'react-spinners';

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
                <ClimbingBoxLoader color={"#2d2d2d"}>
                  <span>Loading...</span>
                </ClimbingBoxLoader>
              </div>
            </>
          }
        </div>
      </div>
    </div>
  )
}
