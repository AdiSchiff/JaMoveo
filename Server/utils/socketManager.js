let io = null;

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
      io.to('rehearsal-room').emit('song-selected', songData);
    });

    // Start/stop scrolling
    socket.on('toggle-scroll', (isScrolling) => {
      io.to('rehearsal-room').emit('scroll-status', isScrolling);
    });

    // Admin ended the session
    socket.on('quit-session', () => {
      io.to('rehearsal-room').emit('session-ended');
    });

    socket.on('disconnect', () => {
      console.log(`🔴 User disconnected: ${socket.id}`);
    });
  });
};

module.exports = { setupSocket };
