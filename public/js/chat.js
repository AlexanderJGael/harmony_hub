const socket = io({
    auth: {
        serverOffset: 0,
    },
});

const form = $('#chat-form');
const input = $('#chat-input');
const messages = $('#chat-messages');

form.on('submit', (e) => {
    e.preventDefault();
    if (input.val()) {
      const item = document.createElement('li');
      item.textContent = `You: ${input.val()}`;
      messages.append(item);
      window.scrollTo(0, document.body.scrollHeight);

      socket.emit('chat message', input.val(), socket.auth.userID);
      input.val('');
    }
});

socket.on('connect', () => {
  socket.emit('request chat log');
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
    p.textContent = `${msg.username}: ${msg.message}`;
    item.appendChild(p);

    messages.append(item);
  });
  window.scrollTo(0, document.body.scrollHeight);
});

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
  p.textContent = `${msg.username}: ${msg.message}`;
  item.appendChild(p);

  messages.append(item);
  window.scrollTo(0, document.body.scrollHeight);
  socket.auth.serverOffset = serverOffset;
});