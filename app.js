const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const socketIO = require("socket.io");
const server = http.createServer(app);
const io = socketIO(server);
const PORT = 301;
app.set("view engine ", " ejs");
app.use(express.static(path.join(__dirname, "public")));
io.on("connection", (socket) => {
  socket.on("send-location", (data) => {
    io.emit("receive-location", { id: socket.id, ...data });
  });
  socket.on("disconnect", () => {
    io.emit("user-disconnected", socket.id);
  });
});
app.get("/", (req, res) => {
  res.render("index.ejs");
});
server.listen(PORT, console.log(`server running on http://localhost:${PORT} `));
console.log("connected");
