import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LogoutButton from "../components/LogoutButton";

const AdminMain = () => {
    const [query, setQuery] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(
                process.env.REACT_APP_API_URL + '/api/songs/search',
                {
                    params: { query },
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            const results = response.data;
            if (!results.length) {
                setError('No songs found.');
                return;
            }

            navigate('/results', { state: { results } });

        } catch (err) {
            console.error('Search error:', err);
            setError(err.response?.data?.message || 'Search failed.');
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card p-4 shadow w-100" style={{ maxWidth: '600px' }}>
                <LogoutButton />
                <h2 className="text-center mb-4">Search for a Song or artist</h2>

                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSearch}>
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter song name or artist"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            required
                        />
                        <button type="submit" className="btn btn-primary">Search</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminMain;
