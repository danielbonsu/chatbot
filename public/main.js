const socket = io();

const chatForm = document.querySelector(
  '.main-form'
);

chatForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const msg = e.target.elements.txt.value;
  const { username, room } = Qs.parse(
    window.location.search,
    {
      ignoreQueryPrefix: true,
    }
  );

  //submit data to server
  socket.emit('chatMessage', {
    username,
    room,
    msg,
  });

  e.target.elements.txt.value = '';
  e.target.elements.txt.focus();
});

socket.on('message', (msg) => {
  console.log(msg);
});
