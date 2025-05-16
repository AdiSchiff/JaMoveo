import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LogoutButton from '../components/LogoutButton';
import { getSocket } from '../components/Socket';

const LivePage = () => {
    const navigate = useNavigate();
    const scrollRef = useRef(null);
    const [isScrolling, setIsScrolling] = useState(false);
    const [song, setSong] = useState(null);

    const role = localStorage.getItem('role');
    const instrument = localStorage.getItem('instrument');
    const token = localStorage.getItem('token');
    const stored = JSON.parse(localStorage.getItem('currentSong') || '{}');
    const slug = stored?.slug;

    const socket = getSocket();

    // Fetch the selected song from the server
    useEffect(() => {
        if (!slug) {
            navigate(role === 'admin' ? '/admin' : '/player');
            return;
        }

        const fetchSong = async () => {
            try {
                const res = await axios.get(
                    `${process.env.REACT_APP_API_URL}/api/songs/fetch/${slug}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setSong(res.data);
            } catch (err) {
                console.error('Failed to fetch song:', err);
                navigate(role === 'admin' ? '/admin' : '/player');
            }
        };

        fetchSong();
    }, [slug, token, navigate, role]);

    // Handle session ended from socket
    useEffect(() => {
        if (!socket) return;

        socket.on('session-ended', () => {
            localStorage.removeItem('currentSong');
            setSong(null);
            navigate(role === 'admin' ? '/admin' : '/player');
        });

        return () => {
            socket.off('session-ended');
        };
    }, [socket, navigate, role]);

    // Handle auto-scrolling
    useEffect(() => {
        if (!isScrolling) return;

        const interval = setInterval(() => {
            if (scrollRef.current) {
                scrollRef.current.scrollBy({ top: 3, behavior: 'smooth' });
            }
        }, 100);

        return () => clearInterval(interval);
    }, [isScrolling]);

    const toggleScroll = () => {
        setIsScrolling((prev) => !prev);
    };

    const quitSession = () => {
        if (socket) {
            socket.emit('quit-session');
        }
    };

    if (!song) return <h2 className="text-center mt-5">Loading song...</h2>;

    return (
        <div className="container py-4 d-flex flex-column min-vh-100">
            <LogoutButton />

            <div
                ref={scrollRef}
                className="flex-grow-1 overflow-auto p-4 rounded"
                style={{
                    backgroundColor: '#111',
                    color: '#fff',
                    fontSize: '2rem',
                    lineHeight: '2.2',
                    maxHeight: '70vh',
                    overflowY: 'auto',
                }}
            >
                <h2 className="text-info text-center mb-4">
                    {song.name} – {song.artist}
                </h2>

                {instrument === 'vocals' ? (
                    <pre>{song.lyrics}</pre>
                ) : (
                    <div>
                        {mergeLyricsAndChords(song.lyrics, song.chords).map((line, idx) => (
                            <pre key={idx} style={{ marginBottom: '0.5rem' }}>
                              {line}
                            </pre>
                        ))}
                    </div>
                    // <pre>{`${song.lyrics}\n\nChords:\n${song.chords}`}</pre>
                )}
            </div>

            <div className="d-flex justify-content-between mt-3">
                <button
                    className={`btn ${isScrolling ? 'btn-danger' : 'btn-primary'}`}
                    onClick={toggleScroll}
                >
                    {isScrolling ? '🛑 Stop Scroll' : '⬇️ Start Scroll'}
                </button>

                {role === 'admin' && (
                    <button className="btn btn-outline-danger" onClick={quitSession}>
                        Quit
                    </button>
                )}
            </div>
        </div>
    );
};

export default LivePage;

// Utility to merge lyrics and chords line-by-line
const mergeLyricsAndChords = (lyrics, chords) => {
    const lyricLines = lyrics?.split('\n') || [];
    const chordLines = chords?.split('\n') || [];

    const maxLines = Math.max(lyricLines.length, chordLines.length);
    const merged = [];

    for (let i = 0; i < maxLines; i++) {
        if (chordLines[i]) merged.push(chordLines[i]);
        if (lyricLines[i]) merged.push(lyricLines[i]);
    }

    return merged;
};