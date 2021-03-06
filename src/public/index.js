document.addEventListener("DOMContentLoaded", (e) => {
  const socket = io();

  const alert = document.getElementById("alert");
  const message = document.getElementById("message");
  const username = document.getElementById("username");

  const sendMessage = () => {
    if (!username.value.trim() || !message.value.trim()) {
      document.getElementById("alert").innerHTML = "Completa los campos";
      alert.classList.remove("d-none");
      message.innerHTML = "";
    } else {
      // Emito el evento personalizado "message" el cual esta a la escucha del servidor
      const data = {
        username: username.value,
        message: message.value.trim(),
      };

      socket.emit("message", data, (response) => {
        console.log(response.status);
      });

      message.value = "";
      alert.classList.add("d-none");
    }
  };

  message.addEventListener("keyup", (e) => {
    e.preventDefault();
    e.code == "Enter" && sendMessage();
  });

  document.getElementById("btn-send").addEventListener("click", (e) => {
    e.preventDefault();
    sendMessage();
  });

  // Emite este evento cuando se conecta
  socket.on("connect", () => {
    console.log(socket.id);
    console.log(socket.connected); // true
  });

  // Emite este evento cuando se desconecta
  socket.on("disconnect", (reason) => {
    console.log(reason);
    console.log(socket.connected); // false
  });

  // Escucha el evento personalizado "messages" emitido por el server
  socket.on("messages", (messages) => {
    let content = "";
    const allMessages = document.getElementById("all-messages");
    for (const message of messages) {
      content += `
        <div>
            <span class="badge ${
              message.username == username.value ? "bg-primary" : "bg-secondary"
            }">${message.username}</span>
            <p>${message.message}</p>
        </div>
    `;
    }
    allMessages.innerHTML = content;
    allMessages.scrollTo(0, allMessages.scrollHeight);
  });

  // Escucha evento errores de conexión
  socket.on("connect_error", (err) => {
    console.log(err);
  });
});
