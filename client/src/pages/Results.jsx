import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getSocket } from "../components/Socket";

const ResultsPage = async () => {
    const {state} = useLocation();
    const navigate = useNavigate();
    const results = state?.results || [];

    const socket = await getSocket();

    const handleSelect = (song) => {
        if (!socket) {
            console.error('Socket not initialized');
            return;
        }

        socket.emit('select-song', song);
        localStorage.setItem('currentSong', JSON.stringify(song));
        navigate('/live');
    };

    const handleBack = () => {
        navigate('/admin');
    };

    if (!results.length) {
        return <h2 className="text-center mt-5">No results to show.</h2>;
    }

    return (
        <div className="container py-4">
            <div className="d-flex align-items-center mb-3 position-relative">
                <button className="btn btn-secondary" onClick={handleBack}>
                    ← Back to Search
                </button>
                <h2 className="position-absolute top-50 start-50 translate-middle m-0">
                    Select a Song
                </h2>
            </div>

            <div className="row">
                {results.map((song) => (
                    <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={song.slug || song.id}>
                        <div
                            className="card h-100 shadow-sm"
                            style={{cursor: 'pointer'}}
                            onClick={() => handleSelect(song)}
                        >
                            <img
                                src={song.image || 'https://via.placeholder.com/300x200?text=No+Image'}
                                className="card-img-top"
                                alt={song.name}
                                style={{
                                    width: '100%',
                                    height: '200px',
                                    objectFit: 'cover',
                                    borderTopLeftRadius: '.25rem',
                                    borderTopRightRadius: '.25rem'
                                }}
                            />
                            <div className="card-body text-center">
                                <h5 className="card-title">{song.name}</h5>
                                <p className="card-text text-muted">{song.artist}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ResultsPage;
