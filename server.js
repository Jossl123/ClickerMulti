const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(express.static(__dirname + '/public/'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

var total = 0

io.on('connection', (client) => {
    io.emit("users_online", io.engine.clientsCount)
    client.clic = 0;
    client.on('clic', () => {
        total += 1
        client.clic += 1
        client.broadcast.emit('total', total);
        client.emit("clic", { total: total, clic_nb: client.clic })
    });

    client.on('disconnect', () => {
        io.emit("users_online", io.engine.clientsCount)
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});