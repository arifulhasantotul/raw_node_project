/*
 * Title: Token Handler
 * Description: Route Token Handler
 * Copyright: Sumit Saha (Learn with Sumit)
 * Date: 05/12/2021
 */

// dependencies
const data = require("../../lib/data");
const {
   hash,
   parseJSON,
   createRandomString,
} = require("../../helpers/utilities");

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

// @TODO: Authentication
handler.token.get = (requestProperties, callback) => {};
handler.token.post = (requestProperties, callback) => {
   const phone =
      typeof requestProperties.body.phone === "string" &&
      requestProperties.body.phone.trim().length === 11
         ? requestProperties.body.phone
         : false;

   const password =
      typeof requestProperties.body.password === "string" &&
      requestProperties.body.password.trim().length > 0
         ? requestProperties.body.password
         : false;
   if (phone && password) {
      data.read("users", phone, (err1, userData) => {
         const hashedPassword = hash(password);
         if (hashedPassword === parseJSON(userData).password) {
            const tokenId = createRandomString(20);
            const expires = Date.now() + 60 * 60 * 1000;
            const tokenObject = {
               phone,
               id: tokenId,
               expires,
            };

            // store token in db
            data.create("tokens", tokenId, tokenObject, (err2) => {
               if (!err2) {
                  callback(200, tokenObject);
               } else {
                  callback(500, {
                     error: "There is a problem in the server side",
                  });
               }
            });
         } else {
            callback(400, {
               error: "Your Password didn't matched",
            });
         }
      });
   } else {
      callback(400, {
         error: "You have a problem in your request",
      });
   }
};
// @TODO: Authentication
handler.token.put = (requestProperties, callback) => {};
// @TODO: Authentication
handler.token.delete = (requestProperties, callback) => {};
module.exports = handler;
