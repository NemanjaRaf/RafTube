const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const { MONGO_URL, SOCKET_PORT } = require("./config")

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const VideoService = require('./services/VideoService');

const port = SOCKET_PORT;

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
}).then(() => {
    console.log("MongoDB connected")
}).catch((err) => {
    console.log(err)
})

io.on('connection', socket => {
    console.log('New client connected', socket.id);

    socket.on('newComment', async (message) => {
        const comment = await VideoService.addCommentSocket(message.video, message);
        io.emit('newComment', comment);
    });

    socket.on('deleteComment', async (id) => {
        await VideoService.removeComment(id);
        io.emit('deleteComment', id);
    });

    socket.on('updateComment', async (message) => {
        const comment = await VideoService.updateComment(message.id, message.data);
        io.emit('updateComment', comment);
    });

    socket.on('disconnect', () => console.log('Client disconnected'));
});

server.listen(port, () => console.log(`Listening on port ${port}`));