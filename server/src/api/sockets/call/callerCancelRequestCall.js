const { emitNotifyToArray } = require("../helper");

let callerRequestCall = (io, data, clients, user) => {
  if (clients[data.listener.id]) {
    // b9: gửi cancel request call tới listener 
    emitNotifyToArray(
      clients,
      data.listener.id,
      io,
      "server-listener-cancel-request-call",
      data
    );
  }
};
module.exports = callerRequestCall;
