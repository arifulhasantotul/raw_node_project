/*
 * Title: Not Found Handler
 * Description: 404 Not Found Handler
 * Copyright: Sumit Saha (Learn with Sumit)
 * Date: 22/11/2021
 */

// Dependencies
const handler = {};

handler.notFoundHandler = (requestProperties, callback) => {
   callback(404, {
      message: "Your requested url was not found",
   });
};
module.exports = handler;
