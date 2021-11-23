/*
 * Title: Token Handler
 * Description: Route Token Handler
 * Copyright: Sumit Saha (Learn with Sumit)
 * Date: 05/12/2021
 */

// dependencies
const data = require("../../lib/data");
// const { hash, parseJSON } = require("../../helpers/utilities");

// module scaffolding
const handler = {};

handler.tokenHandler = (requestProperties, callback) => {
   const acceptedMethods = ["get", "post", "put", "delete"];
   if (acceptedMethods.indexOf(requestProperties.method) > -1) {
      handler.token[requestProperties.method](requestProperties, callback);
   } else {
      callback(405);
   }
};

handler.token = {};

handler.token.get = (requestProperties, callback) => {};
handler.token.post = (requestProperties, callback) => {};
handler.token.put = (requestProperties, callback) => {};
handler.token.delete = (requestProperties, callback) => {};
module.exports = handler;
