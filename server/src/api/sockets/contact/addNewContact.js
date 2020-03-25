const getUserInfo = require("../getUserInfo");
const logger = require('../../../config/logger')
const {pushSocketIdToArray, emitNotifyToArray, removeSocketIdToArray} = require('../helper')
/**
 * @param {*} io from socket.io library
 */

let addNewContact = io => {
  let clients = {};
  io.on("connection", async socket => {
    logger.info("socket connected");
    const user = await getUserInfo(socket.decoded_token.sub);

    // save socketid
    clients = pushSocketIdToArray(clients, user.id, socket.id)
    
    socket.on("add-new-contact", data => {
      let notif = {
        message: `${user.lastname} ${user.firstname} wants to add you to contact`,
        picture: user.picture
      };

      // emit notifications 
      if(clients[data.contactId]){
        emitNotifyToArray(
          clients,
          data.contactId,
          io,
          "add-new-contact",
          notif
        );
      }
    });
    socket.on("disconnect", () => {
     clients = removeSocketIdToArray(clients, user.id, socket);
    });
  });
};


module.exports = addNewContact;
