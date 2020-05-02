const { emitNotifyToArray } = require("../helper");

let typingOff = (io, data, clients, user) => {
//   console.log(data);
  if (data.conversationType === "ChatGroup") {
    // lọc danh sách, bỏ id của người hiện tại
    const receivers = data.receiver.members.filter(
      (item) => item.id !== data.info.id
    );
    receivers.forEach((item) => {
      if (clients[item.id]) {
        emitNotifyToArray(clients, item.id, io, "res-typing-off", data);
      }
    });
  } else if (data.conversationType === "User") {
    if (clients[data.receiver.id]) {
      emitNotifyToArray(clients, data.receiver.id, io, "res-typing-off", data);
    }
  }
};
module.exports = typingOff;
