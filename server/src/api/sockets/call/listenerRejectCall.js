const { emitNotifyToArray } = require("../helper");

let listenerRejectCall = (io, data, clients, user) => {
    // listener hủy cuộc gọi 
  if (clients[data.caller.id]) {
    // b12. gửi về cho caller cuộc gọi đã bị hủy  

    emitNotifyToArray(
      clients,
      data.caller.id,
      io,
      "server-caller-reject-call",
      data
    );
  }
};
module.exports = listenerRejectCall;
