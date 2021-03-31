const serverSocketIO = (io) => {
  const messages = [];
  io.on("connection", (socket) => {
    console.log(socket.id);
    console.log(`Usuario conectado con id: ${socket.id}`);
    io.emit("messages", messages);

    // Escucha el evento personalizado
    socket.on("message", (data) => {
      console.log(data);
      messages.push(data);

      // Emito un evento personalizado "messages" el cual el cliente esta a la escucha
      io.emit("messages", messages);
    });

    socket.on("disconnect", (reason) => {
      console.log("Usuario desconectado");
      console.log(reason);
    });
  });
};

module.exports = serverSocketIO;
