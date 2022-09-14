const express = require('express');
const { closeSync } = require('fs');
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
    client.taxes = 0.25;
    client.clicSpendable = 0;
    client.userName = generate_random_username()
    client.clicIncr = 1
    client.clicIncrCost = 100
    client.pastTime = Date.now()
    client.color = generate_random_color()
    client.on('clic', () => {
        var d = Date.now()
        if (d - client.pastTime < 30) { //check the time between the last click
            console.log("are you cheeting ?")
        } else {
            client.pastTime = d
            total += client.clicIncr
            client.clic += client.clicIncr
            client.clicSpendable += client.clicIncr - (client.clicIncr * client.taxes)
            client.broadcast.emit('total', parseInt(total));
            client.emit("clic", { total: parseInt(total), clic_nb: parseInt(client.clic), spendable_clic: parseInt(client.clicSpendable) })
        }
    });
    client.on('upgradeClick', (msg) => {
        if (client.clicSpendable >= client.clicIncrCost) {
            client.clicSpendable -= client.clicIncrCost
            total -= client.clicIncrCost
            client.clicIncr *= 1.3
            client.clicIncrCost *= 1.7
            client.broadcast.emit('total', total);
            client.emit("upgrade", { total: parseInt(total), clic_nb: parseInt(client.clic), name: "clicIncr", cost: Math.ceil(client.clicIncrCost), incr: (Math.floor(client.clicIncr * 10) / 10).toFixed(1), spendable_clic: parseInt(client.clicSpendable) })
        }
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
    var a = ["Small", "Blue", "Ugly", "Great", "Big", "Giga", "Yellow", "Gross", "Shiny"];
    var b = ["Bear", "Dog", "Banana", "Peperoni", "Elefant", "Cat", "Hat", "Ranger", "Saxophone"];

    var rA = Math.floor(Math.random() * a.length);
    var rB = Math.floor(Math.random() * b.length);
    return a[rA] + b[rB];
}

function generate_random_color() {
    return "hsl(" + 360 * Math.random() + ',' +
        (25 + 70 * Math.random()) + '%,' +
        (85 + 10 * Math.random()) + '%)'
}