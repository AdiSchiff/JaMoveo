import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('instrument');
        localStorage.removeItem('currentSong');
        navigate('/');
    };

    return (
        <div className="position-fixed top-0 end-0 m-3 z-3">
            <button
                onClick={handleLogout}
                className="btn btn-outline-danger btn-sm"
            >
                Logout
            </button>
        </div>
    );
};

export default LogoutButton;
