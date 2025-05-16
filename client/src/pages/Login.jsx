import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // 'success' or 'danger'

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(process.env.REACT_APP_API_LOCAL_URL + '/api/auth/login', formData);
            const { token, role, instrument } = res.data;

            localStorage.setItem('token', token);
            localStorage.setItem('role', role);
            localStorage.setItem('instrument', instrument);

            setMessage('Login successful!');
            setMessageType('success');

            setTimeout(() => {
                navigate(role === 'admin' ? '/admin' : '/player');
            }, 1500);
        } catch (err) {
            console.error('Login error:', err.response);
            setMessage(err.response?.data?.message || 'Login failed');
            setMessageType('danger');
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
                <h2 className="text-center mb-4">Login</h2>

                {message && (
                    <div className={`alert alert-${messageType}`} role="alert">
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                            className="form-control"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            autoFocus
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            className="form-control"
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100">Log In</button>
                </form>

                <div className="text-center mt-3">
                    <button
                        type="button"
                        onClick={() => navigate('/signup')}
                        className="btn btn-link"
                    >
                        Don't have an account? Sign up
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
