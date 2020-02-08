/**
 * @param {*} io from scoket.io library
 */

 let addNewContact = io => {
   io.on("connection", socket => {
     socket.on("add-new-contact", data => {
       console.log(
         "-------------------------------------------------------------------"
       );

       console.log(socket.decoded_token.sub);
       console.log(
         "-------------------------------------------------------------------"
       );
     });
   });
 };
// let addNewContact = io => {
//   io.on("connection", socket => {
//     socket.on("add-new-contact", data => {
//       console.log(
//         "-------------------------------------------------------------------"
//       );

//       console.log(socket);
//       console.log(
//         "-------------------------------------------------------------------"
//       );
//     });
//   });
// };

module.exports = addNewContact;
