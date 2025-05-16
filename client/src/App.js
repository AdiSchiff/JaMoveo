import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import PlayerMain from "./pages/PlayerMain";
import AdminMain from "./pages/AdminMain";
import Results from "./pages/Results";
import Live from "./pages/Live";
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from "./components/AdminRoute";
import SongSelectedRoute from "./components/SongSelectedRoute";
import { useEffect } from "react";
import { initSocket } from "./components/Socket";

function App() {
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            initSocket(token);
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
