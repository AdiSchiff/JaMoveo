let io = null;
let currentSong = null;

const setupSocket = (serverIO) => {
  io = serverIO;

  io.on('connection', (socket) => {
    console.log(`🟢 User connected: ${socket.id}`);

    // Joining the session
    socket.on('join-session', (userData) => {
      console.log(`👥 ${userData.username} joined session`);
      socket.join('rehearsal-room');
    });

    // Admin chose a song -> notify players
    socket.on('select-song', (songData) => {
      console.log(`🎵 Admin selected song: ${songData.name}`);
      currentSong = songData;
      io.to('rehearsal-room').emit('song-selected', songData);
    });

    // Client requests the current song
    socket.on('get-current-song', () => {
      socket.emit('current-song', currentSong);
    });

    // Admin ended the session
    socket.on('quit-session', () => {
      currentSong = null;
      io.to('rehearsal-room').emit('session-ended');
    });

    socket.on('disconnect', () => {
      console.log(`🔴 User disconnected: ${socket.id}`);
    });
  });
};

module.exports = { setupSocket };
