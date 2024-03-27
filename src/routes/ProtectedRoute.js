import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, isAdmin }) {
    const { loading, isAuthenticated, user } = useSelector((state) => state.user);
    if (isAuthenticated === false) {
        return <Navigate to="/" replace={true} />;
    } else if (isAdmin === true && user?.user?.role !== 'admin') {
        return <Navigate to="/" replace={true} />;
    }

    return children;
}

export default ProtectedRoute;
