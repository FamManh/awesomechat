const socketioJwt = require("socketio-jwt");
const { jwtSecret } = require("../../config/vars");
const addNewContact = require("./contact/addNewContact");
const acceptRequestContact = require("./contact/acceptRequestContact");
const sentMessage = require("./chat/sentMessage");
const createGroup = require("./chat/createGroup");
const typingOn = require("./chat/typingOn");
const typingOff = require("./chat/typingOff");
const checkListenerStatus = require("./call/checkListenerStatus");
const listenerEmitPeerId = require("./call/listenerEmitPeerId");
const callerRequestCall = require("./call/callerRequestCall");
const callerCancelRequestCall = require("./call/callerCancelRequestCall");
const listenerAnwserCall = require("./call/listenerAnwserCall");
const listenerRejectCall = require("./call/listenerRejectCall");
const callEnded = require("./call/callEnded");

const getUserInfo = require("./getUserInfo");
const {
  pushSocketIdToArray,
  emitNotifyToArray,
  removeSocketIdToArray,
} = require("./helper");
/**
 * @param {*} io from scoket.io library
 */
let initSockets = (io) => {
  io.use(
    socketioJwt.authorize({
      secret: jwtSecret,
      handshake: true,
    })
  );
  let clients = {};
  console.log(clients)
  io.on("connection", async (socket) => {
    try{
      const user = await getUserInfo(socket.decoded_token.sub);
      if (user) {
        clients = pushSocketIdToArray(clients, user.id, socket.id);
      }

      // handle disconnect
      socket.on("disconnect", () => {
        clients = removeSocketIdToArray(clients, user.id, socket);
      });

      socket.on("sent-message", (data) => sentMessage(io, data, clients, user));
      socket.on("create-group", (data) => createGroup(io, data, clients, user));
      socket.on("add-new-contact", (data) =>
        addNewContact(io, data, clients, user)
      );
      socket.on("accept-request-contact", (data) =>
        acceptRequestContact(io, data, clients, user)
      );

      socket.on("typing-on", (data) => typingOn(io, data, clients, user));
      socket.on("typing-off", (data) => typingOff(io, data, clients, user));
      // check trang thái của người nghe online / offline
      socket.on("caller-server-check-listener-status", (data) =>
        checkListenerStatus(io, data, clients, user)
      );
      // người nghe trả về peerid
      socket.on("listener-server-listener-peer-id", (data) =>
        listenerEmitPeerId(io, data, clients, user)
      );
      // Người gọi yêu cầu gọi
      socket.on("caller-server-request-call", (data) =>
        callerRequestCall(io, data, clients, user)
      );
      // người gọi hủy yêu cầu gọi
      socket.on("caller-server-cancel-request-call", (data) =>
        callerCancelRequestCall(io, data, clients, user)
      );
      // listener huỷ cuộc gọi
      socket.on("listener-server-reject-call", (data) =>
        listenerRejectCall(io, data, clients, user)
      );
      // listener chấp nhận cuộc goi
      socket.on("listener-server-answer-call", (data) =>
        listenerAnwserCall(io, data, clients, user)
      );
      // lắng nghe sự kiện 1 trong 2 user kết thúc cuộc gọi
      socket.on("--server-call-ended", (data) =>
        callEnded(io, data, clients, user)
      );
    }catch(error){
      console.log(error)
    }
  });
};

module.exports = initSockets;
