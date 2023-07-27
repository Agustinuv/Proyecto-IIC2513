const newBookableTable = require('./jobs/newBookableTable');

require('dotenv').config();

const app = require('./app');

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const PORT = process.env.PORT || 8000;

const db = require('./models');

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

db.sequelize.authenticate()
    .then(() => {
        console.log('Connected to database.');
        server.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
            newBookableTable();
        });
    }
    ).catch(err => {
        console.error('Unable to connect to database:', err);
    }
);
