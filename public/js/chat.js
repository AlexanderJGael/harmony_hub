const socket = io({
    auth: {
        serverOffset: 0,
    },
});

const form = document.getElementById('chat-form');
const input = document.getElementById('chat-input');
const messages = document.getElementById('chat-messages');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value) {
      const item = document.createElement('li');
      item.textContent = `You: ${input.value}`;
      messages.appendChild(item);
      window.scrollTo(0, document.body.scrollHeight);

      socket.emit('chat message', input.value, socket.auth.userID);
      input.value = '';
    }
});

socket.on('connect', () => {
  socket.emit('request chat log');
});

socket.on('chat log', (log) => {
  log.forEach((msg) => {
    const item = document.createElement('li');
    item.textContent = `${msg}`;
    messages.appendChild(item);
  });
  window.scrollTo(0, document.body.scrollHeight);
});

socket.on('chat message', (msg, serverOffset) => {
    const item = document.createElement('li');
    item.textContent = `${msg}`;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
    socket.auth.serverOffset = serverOffset;
    });