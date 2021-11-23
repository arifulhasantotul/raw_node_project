/*
 * Title: Routes
 * Description: Application Routes
 * Copyright: Sumit Saha (Learn with Sumit)
 * Date: 22/11/2021
 */

// Dependencies
const { sampleHandler } = require("./handlers/routeHandlers/sampleHandlers");
const { userHandler } = require("./handlers/routeHandlers/userHandler");

const routes = {
   sample: sampleHandler,
   user: userHandler,
};

module.exports = routes;
