import React from 'react';
import { Navigate } from 'react-router-dom';

const SongSelectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    const song = localStorage.getItem('currentSong');

    if (!token || !song) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default SongSelectedRoute;
