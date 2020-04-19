const { emitNotifyToArray } = require("../helper");

let listenerAnswerCall = (io, data, clients, user) => {
  // listener chấp nhận cuộc gọi 
  if (clients[data.caller.id]) {
    // b13. Trả lại caller cuộc gọi được chấp nhân
    emitNotifyToArray(
      clients,
      data.caller.id,
      io,
      "server-caller-answer-call",
      data
    );
  }
  if (clients[data.listener.id]) {
    // b14. Trả lại listener cuộc gọi được chấp nhân
    emitNotifyToArray(
      clients,
      data.listener.id,
      io,
      "server-listener-answer-call",
      data
    );
  }
};
module.exports = listenerAnswerCall;
