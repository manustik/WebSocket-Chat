const { create } = require('domain');
const express = require('express');
const http = require('http');
const { SocketAddress } = require('net');
const socketIo = require('socket.io');

// Iniciamos express y el servidor

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Ruta para el HTML
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Detecta cuando se conecta un cliente
io.on('connection', (socket) => {
    console.log('Un usuario encontrado');

    // Escucha el evento chat message y envia el mensaje a todos los clientes conectados
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg); //Envia el mensaje a todos
    });

    // Detecta cuando se desconecta un cliente
    socket.on('disconnect', () => {
        console.log('Un usuario se ha desconectado')
    });
});

// Inicia el server en el puerto 3000

server.listen(3000, () => {
    console.log('Escuchando en http://localhost:3000')
})

