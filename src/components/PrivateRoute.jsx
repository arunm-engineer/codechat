import React from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

function PrivateRoute({component: Component, firebase: {auth}, ...restProps}) {

    return (
        <Route {...restProps} render={({ props }) => {
            return auth?.uid ? <Component {...props}/> : <Redirect to="/login"/>
        }}/>
    )
}

const mapStateToProps = (store) => {
    return store;
}

export default withRouter(connect(mapStateToProps)(PrivateRoute));