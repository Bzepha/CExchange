const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
   res.sendFile(__dirname + '/Server/public/index.html');
   app.use(express.static(__dirname + '/Server/public', {
       index: false,
        immutable: true,
        cacheControl: true,
        maxAge: "30d"
    }));
});

let chatHistory = [];

io.on('connection', (socket) => {
    console.log('A user connected');

    // Send history to new user
    socket.on('history', () => {
        socket.emit('chat history', chatHistory);
    });

    // Listen for new messages
    socket.on('message', (msg) => {
        chatHistory.push(msg);
        io.emit('message', msg)
        console.log('message:' + msg)
    });

    socket.on('clear', () => {
        chatHistory = [];
        io.emit('clear chat');
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

server.listen(8080, () => {
    console.log('Server listening on 8080');
});