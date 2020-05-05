const { emitNotifyToArray } = require("../helper");
/**
 * @param {*} io from socket.io library
 */

let acceptRequestContact = (io, data, clients, user) => {
  let notif = {
    message: `${user.firstname} ${user.lastname} has added you to the contacts`,
    picture: user.picture,
    firstname: user.firstname,
    lastname: user.lastname,
  };
  // emit notifications
  if (clients[data.id]) {
    emitNotifyToArray(
      clients,
      data.id,
      io,
      "res-accept-request-contact",
      notif
    );
  }
};

module.exports = acceptRequestContact;
