/*
 * Title: Uptime monitoring application
 * Description: A RESTful API to monitor up or down time of user defined links
 * Copyright: Sumit Saha (Learn with Sumit)
 * Date: 22/11/2021
 */

// Dependencies
const http = require("http");
const { handleReqRes } = require("./helpers/handleReqRes");
const environment = require("./helpers/environments");
const data = require("./lib/data");
const { sendTwiliosSms } = require("./helpers/notifications");

// app object - module scaffolding
const app = {};

// @TODO pore muche dibo
sendTwiliosSms("01611759902", "Hello Bro", (err) => {
   console.log("this is the err", err);
});

// create server
app.createServer = () => {
   const server = http.createServer(app.handleReqRes);
   server.listen(environment.port, () => {
      console.log(`listening to port ${environment.port}`);
   });
};

// handle request response
app.handleReqRes = handleReqRes;
// start the server
app.createServer();
