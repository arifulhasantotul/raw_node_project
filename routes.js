/*
 * Title: Routes
 * Description: Application Routes
 * Copyright: Sumit Saha (Learn with Sumit)
 * Date: 22/11/2021
 */

// Dependencies
const { sampleHandler } = require("./handlers/routeHandlers/sampleHandlers");
const { tokenHandler } = require("./handlers/routeHandlers/tokenHandler");
const { userHandler } = require("./handlers/routeHandlers/userHandler");
const { checkHandler } = require("./handlers/routeHandlers/checkHandler");

const routes = {
   sample: sampleHandler,
   user: userHandler,
   token: tokenHandler,
   check: checkHandler,
};

module.exports = routes;
