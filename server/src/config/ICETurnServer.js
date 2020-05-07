const request = require("request");

// Node Get ICE STUN and TURN list
// let o = { format: "urls" };
// let bodyString = JSON.stringify(o);
// let https = require("https");
// let options = {
//   host: "global.xirsys.net",
//   path: "/_turn/awesome-chat",
//   method: "PUT",
//   headers: {
//     Authorization:
//       "Basic " +
//       Buffer.from("Fammanh:fe86a598-8fde-11ea-8f95-0242ac150002").toString(
//         "base64"
//       ),
//     "Content-Type": "application/json",
//     "Content-Length": bodyString.length,
//   },
// };
// let httpreq = https.request(options, function (httpres) {
//   let str = "";
//   httpres.on("data", function (data) {
//     str += data;
//   });
//   httpres.on("error", function (e) {
//     console.log("error: ", e);
//   });
//   httpres.on("end", function () {
//     console.log("ICE List: ", str);
//   });
// });
// httpreq.on("error", function (e) {
//   console.log("request error: ", e);
// });
// httpreq.end();

let getICETurnServer = () => {
  return new Promise(async (resolve, reject) => {
    // get ICE STUN and TURN list
    let o = {
      format: "urls",
    };
    let bodyString = JSON.stringify(o);
    const host = "global.xirsys.net";
    const path = "/_turn/awesome-chat";
    let options = {
      url: `https://${host}${path}`,
      method: "PUT",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(
            "fammanh217:b8a05688-9055-11ea-ab11-0242ac150003"
          ).toString("base64"),
              "Content-Type": "application/json",
              "Content-Length": bodyString.length
      },
    };
    // call request to get ICE list of TURN server
    request(options, (error, res, body) => {
      if (error) {
        console.log("Error when get ICE list: " + error);
        return reject(error);
      }
      let bodyJson = JSON.parse(body);
      resolve(bodyJson.v.iceServers);
    });
  });
};

getICETurnServer();
module.exports = getICETurnServer;