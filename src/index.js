const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

app = express();

// Configs
app.set('port', 3000);

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Middlewares
app.use(express.static(path.join(__dirname, 'public')));

const server = http.createServer(app);
const io = socketIO(server);
require('./socket')(io);

server.listen(app.get('port'), () => console.log(`Server running on port ${app.get('port')}`));