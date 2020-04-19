const { emitNotifyToArray } = require("../helper");

let listenerEmitPeerId = (io, data, clients, user) => {
  if (clients[data.caller.id]) {
    // b05. Trả lại thông tin và peerId cho caller 
    // console.log(data);

    emitNotifyToArray(
      clients,
      data.caller.id,
      io,
      "server-caller-listener-peer-id",
      data
    );
  }
};
module.exports = listenerEmitPeerId;
