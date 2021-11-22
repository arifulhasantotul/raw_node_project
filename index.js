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

// app object - module scaffolding
const app = {};

// @TODO pore muche dibo
data.update(
   "test",
   "newFile",
   { name: "England", language: "English" },
   (err) => {
      console.log(err);
   }
);

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
