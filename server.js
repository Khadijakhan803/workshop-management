const http = require('http');
const socketIo = require('socket.io');
const app = require('./app');

const server = http.createServer(app);
const io = socketIo(server);

// WebSocket connection
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = io; // Export io for use in controllers