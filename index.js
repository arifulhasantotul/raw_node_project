/*
 * Title: Uptime monitoring application
 * Description: A RESTful API to monitor up or down time of user defined links
 * Copyright: Sumit Saha (Learn with Sumit)
 * Date: 22/11/2021
 */

// Dependencies
const http = require("http");

// app object - module scaffolding
const app = {};

// configuration
app.config = {
   port: 5000,
};

// create server
app.createServer = () => {
   const server = http.createServer(app.handleReqRes);
   server.listen(app.config.port, () => {
      console.log(`listening to port ${app.config.port}`);
   });
};

// handle request response
app.handleReqRes = (req, res) => {
   // response handle
   res.end("Hello world");
};

// start the server
app.createServer();
