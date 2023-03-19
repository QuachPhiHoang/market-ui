import React, { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

function ProtectedRoute({ element: Component, ...rest }) {
    const { loading, isAuthenticated, user } = useSelector((state) => state.user);
    <Route
        {...rest}
        render={(props) => {
            if (isAuthenticated === false) {
                return <Redirect to="/login" />;
            }

            if (user.isAdmin === true && user.role !== 'admin') {
                return <Redirect to="/login" />;
            }

            return <Component {...props} />;
        }}
    />;
}

export default ProtectedRoute;
