const socketioJwt = require("socketio-jwt");
const { jwtSecret } = require("../../config/vars");
const addNewContact = require("./contact/addNewContact");
const sentMessage = require("./chat/sentMessage");
const createGroup = require("./chat/createGroup");
const typingOn = require("./chat/typingOn");
const typingOff = require("./chat/typingOff");
const getUserInfo = require("./getUserInfo");
const {
  pushSocketIdToArray,
  emitNotifyToArray,
  removeSocketIdToArray
} = require("./helper");
/**
 * @param {*} io from scoket.io library
 */
let initSockets = io => {
  io.use(
    socketioJwt.authorize({
      secret: jwtSecret,
      handshake: true
    })
  );
  let clients = {};
  io.on("connection", async socket => {
    console.log(clients);
    const user = await getUserInfo(socket.decoded_token.sub);
    clients = pushSocketIdToArray(clients, user.id, socket.id);

    // handle disconnect
    socket.on("disconnect", () => {
      clients = removeSocketIdToArray(clients, user.id, socket);
    });

    socket.on("sent-message", data => sentMessage(io, data, clients, user));
    socket.on("create-group", (data) => createGroup(io, data, clients, user));
    socket.on("add-new-contact", data => addNewContact(io, data, clients, user));
    socket.on("typing-on", (data) => typingOn(io, data, clients, user));
    socket.on("typing-off", (data) => typingOff(io, data, clients, user));
  });
};

module.exports = initSockets;
