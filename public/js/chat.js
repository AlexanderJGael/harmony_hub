let counter = 0;

const socket = io({
    auth: {
        serverOffset: 0,
    },
    ackTimeout: 10000,
    retries: 3,
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
  item.appendChild(p);
  messages.append(item);
  window.scrollTo(0, document.body.scrollHeight);
};

socket.on('connect', () => {
  socket.emit('request chat log');
});

socket.on('disconnect', () => {
  displayErrorMessage('Connection severed. Please refresh the page.');
});

socket.on('reconnect', () => {
  displayErrorMessage('Reconnected to the server.');
});

socket.on('chat log', (log) => {
  log.forEach((msg) => {
    const item = document.createElement('li');
    item.className = "d-flex text-start p-2";

    const img = document.createElement('img');
    img.src = msg.avatar;
    img.alt = msg.username;
    img.className = "rounded-circle";
    img.style.width = "32px";
    img.style.height = "32px";
    item.appendChild(img);

    const p = document.createElement('p');
    p.className = "m-2";
    p.textContent = `${msg.username}: ${msg.content}`;
    item.appendChild(p);

    messages.append(item);
  });
  window.scrollTo(0, document.body.scrollHeight);
});

form.on('submit', (e) => {
    e.preventDefault();
    if (input.val()) {
      const item = document.createElement('li');
      item.textContent = `You: ${input.val()}`;
      messages.append(item);
      window.scrollTo(0, document.body.scrollHeight);

      if (!socket.connected) {
        displayErrorMessage('Connection severed. Please refresh the page.');
      } else {
        const clientOffset = `${socket.id}-${counter++}`;
        socket.emit('chat message', input.val(), clientOffset);
        input.val('');
      };
    };
});

// Store messages in local storage to persist them across sessions
socket.on('chat message', (msg, serverOffset) => {
  const item = document.createElement('li');
  item.className = "d-flex text-start p-2";
  const img = document.createElement('img');
  img.src = msg.avatar;
  img.alt = msg.username;
  img.className = "rounded-circle";
  img.style.width = "32px";
  img.style.height = "32px";
  item.appendChild(img);
  const p = document.createElement('p');
  p.className = "m-2";
  p.textContent = msg.content;
  item.appendChild(p);
  messages.append(item);
  window.scrollTo(0, document.body.scrollHeight);
  socket.auth.serverOffset = serverOffset;

  // Save message to local storage
  let messagesArray = JSON.parse(localStorage.getItem('messages')) || [];
  messagesArray.push({username: msg.username, message: msg.content, avatar: msg.avatar});
  localStorage.setItem('messages', JSON.stringify(messagesArray));
});

// Load messages from local storage when page loads
document.addEventListener('DOMContentLoaded', () => {
  let messagesArray = JSON.parse(localStorage.getItem('messages')) || [];
  messagesArray.forEach((msg) => {
    const item = document.createElement('li');
    item.className = "d-flex text-start p-2";
    const img = document.createElement('img');
    img.src = msg.avatar;
    img.alt = msg.username;
    img.className = "rounded-circle";
    img.style.width = "32px";
    img.style.height = "32px";
    item.appendChild(img);
    const p = document.createElement('p');
    p.className = "m-2";
    p.textContent = `${msg.username}: ${msg.content}`;
    item.appendChild(p);
    messages.append(item);
  });
  window.scrollTo(0, document.body.scrollHeight);
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