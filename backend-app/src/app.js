const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');

const app = express();

const routes = require('./routes/index');
const { errorHandler, notFoundError } = require('./middlewares/errorHandler');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(routes);
app.use(errorHandler);
app.use(notFoundError);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// io.on('connection', (socket) => {
//     socket.on('new-user', name => {
//         users[socket.id] = name
//         socket.broadcast.emit('user-connected', name)
//     })
//     socket.on('send-chat-message', message => {
//         socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
//     })
//     socket.on('disconnect', () => {
//         socket.broadcast.emit('user-disconnected', users[socket.id])

//     console.log('New client connected');
//     socket.on('disconnect', () => {
//         console.log('Client disconnected');
//     })
// });


module.exports = app;