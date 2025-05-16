import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        instrument: '',
        role: 'player'
    });

    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // 'success' or 'danger'

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'role' && value === 'admin') {
            setFormData(prev => ({
                ...prev,
                role: value,
                instrument: ''
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password.length < 4) {
            setMessage('Password must be at least 4 characters');
            setMessageType('danger');
            return;
        }

        const dataToSend = { ...formData };
        if (dataToSend.role === 'admin') {
            delete dataToSend.instrument;
        }

        try {
            await axios.post(process.env.REACT_APP_API_URL + '/api/auth/signup', dataToSend);
            setMessage('Signup successful! Redirecting to login...');
            setMessageType('success');

            setFormData({
                username: '',
                password: '',
                instrument: '',
                role: 'player'
            });

            setTimeout(() => {
                setMessage('');
                navigate('/');
            }, 2000);

        } catch (err) {
            console.error('Signup error:', err.response);
            setMessage(err.response?.data?.message || 'Signup failed');
            setMessageType('danger');
            setTimeout(() => setMessage(''), 3000);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card p-4 shadow" style={{ maxWidth: '450px', width: '100%' }}>
                <h2 className="text-center mb-4">Sign Up</h2>

                {message && (
                    <div className={`alert alert-${messageType}`} role="alert">
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input
                            className="form-control"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            className="form-control"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {formData.role === 'player' && (
                        <div className="mb-3">
                            <label className="form-label">Instrument</label>
                            <select
                                className="form-select"
                                name="instrument"
                                value={formData.instrument}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select instrument</option>
                                <option value="guitar">Guitar</option>
                                <option value="piano">Piano</option>
                                <option value="bass">Bass</option>
                                <option value="drums">Drums</option>
                                <option value="vocals">Vocals</option>
                                <option value="saxophone">Saxophone</option>
                                <option value="violin">Violin</option>
                            </select>
                        </div>
                    )}

                    <div className="mb-3">
                        <label className="form-label">Role</label>
                        <select
                            className="form-select"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                        >
                            <option value="player">Player</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    <button type="submit" className="btn btn-primary w-100">Sign Up</button>
                </form>

                <div className="text-center mt-3">
                    <button
                        type="button"
                        onClick={() => navigate('/')}
                        className="btn btn-link"
                    >
                        Already have an account? Log in
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
