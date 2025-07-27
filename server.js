const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 3000;

app.use(express.static('public'));

const bookings = []; 

setInterval(() => {
  const newBooking = {
    venueName: `Venue ${Math.floor(Math.random() * 100)}`,
    partySize: Math.floor(Math.random() * 10) + 1,
    time: new Date().toLocaleTimeString()
  };
  bookings.unshift(newBooking);
  io.emit('new-booking', newBooking);
}, 5000);

io.on('connection', (socket) => {
  console.log('Client connected');
  bookings.forEach(b => socket.emit('new-booking', b));
});

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
