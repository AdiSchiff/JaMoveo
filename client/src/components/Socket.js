import { io } from 'socket.io-client';

let socket = null;

export const initSocket = (token) => {
    if (!socket || !socket.connected) {
        socket = io(process.env.REACT_APP_API_URL, {
            auth: { token }
        });
    }
    return socket;
};

export const getSocket = () => socket;
