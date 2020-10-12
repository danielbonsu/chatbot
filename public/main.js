const socket = io();

const chatForm = document.querySelector(
  '.main-form'
);
const { username, room } = Qs.parse(

  window.location.search,
  {
    ignoreQueryPrefix: true,
  }
);

// join user to room
socket.emit('joinRoom', { username, room })


chatForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const msg = e.target.elements.txt.value;



  //submit data to server
  socket.emit('chatMessage', {
    username,
    room,
    msg,
    img:
      'https://avatars0.githubusercontent.com/u/1?v=4',
  });




  e.target.elements.txt.value = '';
  e.target.elements.txt.focus();
});

socket.on('chatMessage', (msg) => {
  outputMessage(msg)
})

socket.on('message', (msg) => {
  console.log(msg);
  const destination = document.querySelector(
    '.chat-messages'
  );

  destination.appendChild(outputMessage(msg));

  // chat always seoll to bottom
  destination.scrollTop =
    destination.scrollHeight;
});

// output message into dom

const outputMessage = (serverData) => {
  const {
    username,
    time,
    room,
    msg,
    img,
  } = serverData;
  console.log(serverData);

  const msgDiv = document.createElement('div');
  msgDiv.classList.add('message');

  msgDiv.innerHTML = `<div class="message-container">

      <div class="img-container">
        <img src=${img} alt="" />
      </div>
        <p>
            ${msg}
            <span class='msg-time'>${time} ${username}</span>
        </p>
        
    </div>`;

  return msgDiv;
};
