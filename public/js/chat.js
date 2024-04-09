document.addEventListener('DOMContentLoaded', () => {
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


const displayErrorMessage = (error) =>  {
  const item = document.createElement('li');
  item.className = "d-flex text-start p-2";
  const p = document.createElement('p');
  p.className = "m-2 text-danger";
  p.textContent = $(error).text();
  item.append(p);
  messages.append(item);
  window.scrollTo(0, document.body.scrollHeight);
};

form.on('submit', async (e) => {
    e.preventDefault();
    const message = input.val();
    
    try {
      if (!message) {
        return;
      }

      const item = document.createElement('li');
      item.textContent = `You: ${message}`;
      messages.append(item);
      window.scrollTo(0, document.body.scrollHeight);
      const clientOffset = `${socket.id}-${counter++}`
      
      socket.emit('chat message', message, clientOffset);
      
      input.val('');
    } catch (error) {
      displayErrorMessage(error);
      return;
    }
})

socket.on('chat message', (newMessage, serverOffset) => {
  const item = document.createElement('li');
  item.textContent = `${newMessage.username}: ${newMessage.content}`;
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