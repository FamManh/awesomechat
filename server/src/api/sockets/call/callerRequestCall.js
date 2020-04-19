const { emitNotifyToArray } = require("../helper");

let callerRequestCall = (io, data, clients, user) => {
  if (clients[data.listener.id]) {
    // b8. gửi yêu cầu call tới listener 
    emitNotifyToArray(
      clients,
      data.listener.id,
      io,
      "server-listener-request-call",
      data
    );
  }
};
module.exports = callerRequestCall;
