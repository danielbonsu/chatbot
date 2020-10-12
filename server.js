const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const socketio = require('socket.io');
const { userJoin, userLeave, getCurrentUser } = require('./public/utils/users');
const formatMessage = require('./public/utils/messages');

const io = socketio(server);

io.on('connection', (socket) => {
  socket.emit('message', 'welcome to chatbot');



  // join user to room
  socket.on('joinRoom', ({ username, room }) => {
    const user = { username, room, id: socket.id }
    userJoin(user)
    socket.join(user.room)

    socket.broadcast.to(user.room).emit('message', formatMessage({ username: 'socket', msg: `${user.username} has joined the chat` }))
  })

  socket.on('disconnect', () => {
    const user = userLeave(socket.id)

    if (user) {
      io.to(user.room).emit('message', formatMessage({ username: "socket", msg: `${user.username} has left teh chat room` }))
    }
  });


  socket.on('chatMessage', (newUser) => {

    console.log('user is', newUser)

    io.to(newUser.room).emit('message', formatMessage(newUser))
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
