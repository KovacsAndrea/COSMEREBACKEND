"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var socket_io_1 = require("socket.io");
var http_1 = require("http");
var httpServer = (0, http_1.createServer)();
var io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: 'http://localhost:5173'
    }
});
io.on('connection', function (socket) {
    console.log('Client connected');
    socket.on('requestMessage', function () {
        console.log('Received request for message');
        socket.emit('messageFromServer', "My message");
    });
});
io.listen(5000);
