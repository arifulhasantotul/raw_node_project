/*
 * Title: Project initial file
 * Description: Initial file to start the node server and workers
 * Title: Uptime monitoring application
 * Description: A RESTful API to monitor up or down time of user defined links
 * Copyright: Sumit Saha (Learn with Sumit)
 * Date: 22/11/2021
 */

// Dependencies
const server = require("./lib/server");
const workers = require("./lib/worker");

// app object - module scaffolding
const app = {};

// create server
app.init = () => {
   // start the server
   server.init();

   // start the workers
   workers.init();
};

app.init();

// module export
module.exports = app;
