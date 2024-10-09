const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        //origin: '*', // Allows requests from any origin (For dev)
        origin: "http://localhost:8080",
        methods: ["GET", "POST"]
    }
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