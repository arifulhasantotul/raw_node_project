/*
 * Title: server library
 * Description: Server related files
 * Copyright: Sumit Saha (Learn with Sumit)
 * Date: 22/11/2021
 */

// Dependencies
const http = require("http");
const { handleReqRes } = require("../helpers/handleReqRes");

// server object - module scaffolding
const server = {};

// configuration
server.config = {
   port: 3000,
};

// create server
server.createServer = () => {
   const createServerVariables = http.createServer(server.handleReqRes);
   createServerVariables.listen(server.config.port, () => {
      console.log(`listening to port ${server.config.port}`);
   });
};

// handle request response
server.handleReqRes = handleReqRes;
// start the createServerVariables
server.init = () => {
   server.createServer();
};

module.exports = server;
