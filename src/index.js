const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");
const serverSocketIO = require("./socket");

app = express();

// Configs
app.set("port", 3000);

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// Middlewares
app.use(express.static(path.join(__dirname, "public")));

// Server initialization
const httpServer = http.createServer(app);
const io = socketIO(httpServer);

serverSocketIO(io);

httpServer.listen(app.get("port"), () =>
  console.log(`Server running on port ${app.get("port")}`)
);
