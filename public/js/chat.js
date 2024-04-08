onload = () => {
let counter = 0;

const socket = io({
    auth: {
        serverOffset: 0,
    },
});

const form = $('#chat-form');
const input = $('#chat-input');
const messages = $('#chat-messages');

function displayErrorMessage(message) {
  const item = document.createElement('li');
  item.className = "d-flex text-start p-2";
  const p = document.createElement('p');
  p.className = "m-2 text-danger";
  p.textContent = `Error: ${message}`;
  item.append(p);
  messages.append(item);
  window.scrollTo(0, document.body.scrollHeight);
};

/* socket.on('connect', () => {
  socket.emit('request chat log');
}); */

socket.on('disconnect', () => {
  displayErrorMessage('Connection severed. Please refresh the page.');
});

socket.on('reconnect', () => {
  displayErrorMessage('Reconnected to the server.');
});


form.on('submit', (e) => {
    e.preventDefault();
    if (input.val()) {
      const item = document.createElement('li');
      item.textContent = `You: ${input.val()}`;
      messages.append(item);
      window.scrollTo(0, document.body.scrollHeight);
      socket.emit('chat message', input.val());
      input.val('');
    }
});

socket.on('chat message', (msg, serverOffset) => {
  const item = document.createElement('li');
  item.textContent = msg;
  messages.append(item);
  window.scrollTo(0, document.body.scrollHeight);
  socket.auth.serverOffset = serverOffset;
});

socket.on('error', (error) => {
  if (!error.message) {
    return;
  };
  displayErrorMessage(error.message);
});

// If user logs out, destroy messages in local storage
socket.on('logout', () => {
  localStorage.removeItem('messages');
});
};