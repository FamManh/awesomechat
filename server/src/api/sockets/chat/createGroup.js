const { emitNotifyToArray } = require("../helper");

let createGroup = (io, data, clients, user) => {
    
    data.members.forEach((item) => {
      if (clients[item]) {
        emitNotifyToArray(clients, item, io, "res-create-group", data);
      }
    });

};
module.exports = createGroup;
