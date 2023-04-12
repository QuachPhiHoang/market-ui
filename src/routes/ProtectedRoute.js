import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, isAdmin }) {
    const { loading, isAuthenticated, user } = useSelector((state) => state.user);
    if (isAuthenticated === false) {
        console.log('au', 1);
        return <Navigate to="/login" />;
    } else if (isAdmin === true && user?.user?.role !== 'admin') {
        console.log('is', 1);

        return <Navigate to="/login" />;
    }
    console.log('do', 1);

    return children;
}

export default ProtectedRoute;
