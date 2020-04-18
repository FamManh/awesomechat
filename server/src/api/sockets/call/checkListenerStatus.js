const { emitNotifyToArray } = require("../helper");

let checkListenerStatus = (io, data, clients, user) => {
  // b02. Trả về trạng thái của listener cho caller 
  emitNotifyToArray(clients, data.caller.id, io, "server-caller-listener-status", {
    ...data,
    status: clients[data.listener.id] ? "online": "offline",
  });

  if (clients[data.listener.id]) {
    // b3: nếu listener online, gửi request tới listener yêu cầu peerid
    emitNotifyToArray(
      clients,
      data.listener.id,
      io,
      "server-listener-request-peer-id",
      data
    );
  }
};
module.exports = checkListenerStatus;
