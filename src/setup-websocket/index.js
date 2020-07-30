const socketio = require("socket.io");

const { getUriAndUpload } = require("./controllers");

const setupWebSocket = (server) => {
  const io = socketio(server);

  io.on("connection", (socket) => {
    socket.on("getLinkFromFrontEnd", (link) => getUriAndUpload(link, io));
  });
};

module.exports = setupWebSocket;
