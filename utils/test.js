// Test socket.io functions
describe('Socket.io', function() {
    it('should emit chat message', function(done) {
        const socketURL = 'http://localhost:3001';
        const options = {
            transports: ['websocket'],
            'force new connection': true
        };

        const chatUser1 = { name: 'Tom' };
        const chatUser2 = { name: 'Sally' };
        const message = 'Hello World';

        const chatUser1Client = client.connect(socketURL, options);

        chatUser1Client.on('connect', function(data) {
            chatUser1Client.emit('chat message', message);

            /* Since the client is connected, we should be able to immediately receive the chat message */
            const chatUser2Client = client.connect(socketURL, options);

            chatUser2Client.on('chat message', function(msg) {
                assert.equal(message, msg);
                chatUser1Client.disconnect();
                chatUser2Client.disconnect();
                done();
            });
        });
    });
});