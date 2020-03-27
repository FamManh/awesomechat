const {
  emitNotifyToArray
} = require("../helper");


let sentMessage = (io, data,clients, user ) => {
  if (clients[data.receiver._id]) {
    emitNotifyToArray(clients, data.receiver._id, io, "res-sent-message", data);
  }
};
module.exports = sentMessage;
