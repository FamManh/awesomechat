const { emitNotifyToArray } = require("../helper");

let callEnded = (io, data, clients, user) => {
  // nhận sự kiện 1 trong 2 user kết thúc cuộc hội thoại 
  if (clients[data.id]) {
    emitNotifyToArray(
      clients,
      data.id,
      io,
      "server--call-ended"
    );
  }
};
module.exports = callEnded;
