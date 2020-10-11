const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const socketio = require('socket.io');

const formatMessage = require('./public/utils/messages');
const io = socketio(server);

io.on('connection', (socket) => {
  socket.emit('message', 'welcome to chatbot');

  socket.on('chatMessage', (msg) => {
    console.log(formatMessage(msg));
    socket.emit('message', formatMessage(msg));
  });
});

app.use(
  express.static(path.join(__dirname, 'public'))
);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
});

//form message and send back to client
