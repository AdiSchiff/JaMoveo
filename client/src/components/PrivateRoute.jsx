import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');

    // If not logged in → redirect to login
    if (!token) {
        return <Navigate to="/" replace />;
    }

    // Otherwise → render the protected component
    return children;
};

export default PrivateRoute;
