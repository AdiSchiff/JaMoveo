import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutButton from "../components/LogoutButton";
import { getSocket } from "../components/Socket";

const PlayerMain = () => {
    const navigate = useNavigate();
    const username = localStorage.getItem('username');
    const role = localStorage.getItem('role');

    useEffect(async () => {
        const socket = await getSocket();

        if (!socket) {
            console.error('Socket not initialized');
            return;
        }

        const onSongSelected = (songData) => {
            localStorage.setItem('currentSong', JSON.stringify(songData));
            navigate('/live');
        };

        socket.on('song-selected', onSongSelected);

        return () => {
            socket.off('song-selected', onSongSelected);
        };
    }, [navigate, username, role]);

    return (
        <div className="container d-flex flex-column min-vh-100 justify-content-center align-items-center">
            <LogoutButton />
            <div className="card shadow p-5 text-center" style={{ maxWidth: '500px', width: '100%' }}>
                <h2 className="mb-4" style={{ fontSize: '2.5rem' }}>
                    🎵 Waiting for next song...
                </h2>
            </div>
        </div>
    );
};

export default PlayerMain;
