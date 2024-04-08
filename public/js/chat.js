document.addEventListener('DOMContentLoaded', () => {
let counter = 0;

const socket = io({
    auth: {
        serverOffset: 0,
    },
});

const form = $('#chat-form');
const input = $('#chat-input');
const messages = $('#chat-messages');
const userData = $('chat-container').dataset.user;
const user = JSON.parse(userData);
const msg = $('#chat-input').val();


const displayErrorMessage = (message) =>  {
  const item = document.createElement('li');
  item.className = "d-flex text-start p-2";
  const p = document.createElement('p');
  p.className = "m-2 text-danger";
  p.textContent = `Error: ${message}`;
  item.append(p);
  messages.append(item);
  window.scrollTo(0, document.body.scrollHeight);
};

const postMessage = async (user, msg) => {
  try {
    const newMessage = await Messages.create({ content: msg, userId: user.id, userName: user.username });
    return newMessage;
  } catch (e) {
    console.error(e);
    throw e;
  }
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


form.on('submit', async (e) => {
    e.preventDefault();
    const message = input.val();

    if (msg) {
      const item = document.createElement('li');
      item.textContent = `You: ${msg.message}`;
      messages.append(item);
      window.scrollTo(0, document.body.scrollHeight);
      socket.emit('chat message', msg);
      input.val('');
    }
})

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
});