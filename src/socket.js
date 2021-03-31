module.exports = (io) => {
    const messages = [];
    io.on('connection', (socket) => {
        console.log('Usuario conectado');
        io.emit('messages', messages);

        socket.on('message', (data) => {
            messages.push(data);            
            io.emit('messages', messages);
        })

        socket.on('disconnect', () => {
            console.log('Usuario desconectado');
        })
    })
}
