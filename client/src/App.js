import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { initSocket } from './components/Socket';

import Signup from './pages/Signup';
import Login from './pages/Login';
import AdminMain from './pages/AdminMain';
import Results from './pages/Results';
import PlayerMain from './pages/PlayerMain';
import Live from './pages/Live';

import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import SongSelectedRoute from './components/SongSelectedRoute';

function App() {
    useEffect(async () => {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');
        const role = localStorage.getItem('role');

        if (token) {
            const socket = await initSocket(token);
            socket.emit('join-session', {
                username,
                role
            });
        }
    }, []);

    return (
        <Router>
            <Routes>
                {/* Public routes */}
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* Protected routes */}
                <Route path="/admin" element={
                    <AdminRoute>
                        <AdminMain />
                    </AdminRoute>
                } />
                <Route path="/results" element={
                    <AdminRoute>
                        <Results />
                    </AdminRoute>
                } />
                <Route path="/player" element={
                    <PrivateRoute>
                        <PlayerMain />
                    </PrivateRoute>
                } />
                <Route path="/live" element={
                    <SongSelectedRoute>
                        <Live />
                    </SongSelectedRoute>
                } />
            </Routes>
        </Router>
    );
}

export default App;
