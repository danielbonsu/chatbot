const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const socketio = require('socket.io');
const UserJoin = require('./public/utils/users');
const formatMessage = require('./public/utils/messages');
const userJoin = require('./public/utils/users');
const io = socketio(server);

io.on('connection', (socket) => {
  socket.emit('message', 'welcome to chatbot');

  socket.broadcast.emit(
    'message',
    'someone joined us'
  );

  socket.on('disconnect', () => {
    io.emit(
      'message',
      'some douche left the chat room'
    );
  });
  socket.on('chatMessage', (newUser) => {
    const newUser_Obj = {
      ...newUser,
      id: socket.id,
    };
    userJoin(newUser_Obj);
    // console.log(formatMessage(msg));
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
