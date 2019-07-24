import * as React from 'react';
import { connect } from 'react-redux';
import { RouteProps } from 'react-router';
import { Redirect, Route } from 'react-router-dom';

import { OverallAppState } from '../../../reducers/initialState';

interface Props extends RouteProps {
  loggedIn: boolean;
}

class ProtectedRoute extends React.Component<Props> {
    render() {
        if (!this.props.loggedIn) {
            return <Redirect to="/" />;
        }

        return <Route {...this.props} />;
    }
}

const mapStateToProps = (state: OverallAppState) => ({
    loggedIn: state.app.loggedIn,
});

export default connect(mapStateToProps)(ProtectedRoute);
