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
        <button
            onClick={handleLogout}
            style={{
                position: 'fixed',
                top: '20px',
                right: '20px',
                padding: '0.5rem 1rem',
                background: '#444',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
            }}
        >
            Logout
        </button>
    );
};

export default LogoutButton;
