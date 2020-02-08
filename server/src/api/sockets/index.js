const addNewContact = require('./contact/addNewContact')
const socketioJwt = require("socketio-jwt");
const {jwtSecret} = require('../../config/vars')
/**
 * @param {*} io from scoket.io library
 */
let initSockets = (io) => {
    io.use(
      socketioJwt.authorize({
        secret: jwtSecret,
        handshake: true
      })
    );
    addNewContact(io);
}

module.exports = initSockets;
