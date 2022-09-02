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
    client.userName = generate_random_username()
    client.color = generate_random_color()
    client.on('clic', () => {
        total += 1
        client.clic += 1
        client.broadcast.emit('total', total);
        client.emit("clic", { total: total, clic_nb: client.clic })
    });
    client.on('send_msg', (msg) => {
        io.emit("receive_msg", { sender: client.userName, msg: msg, color: client.color })
    });

    client.on('disconnect', () => {
        io.emit("users_online", io.engine.clientsCount)
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});

function generate_random_username() {
    var a = ["Small", "Blue", "Ugly", "Great", "Big", "Giga"];
    var b = ["Bear", "Dog", "Banana", "Peperoni", "Elefant", "Cat", "Hat"];

    var rA = Math.floor(Math.random() * a.length);
    var rB = Math.floor(Math.random() * b.length);
    return a[rA] + b[rB];
}

function generate_random_color() {
    return "hsl(" + 360 * Math.random() + ',' +
        (25 + 70 * Math.random()) + '%,' +
        (85 + 10 * Math.random()) + '%)'
}