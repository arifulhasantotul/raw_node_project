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

handler.token.get = (requestProperties, callback) => {
   // check the id if valid
   const id =
      typeof requestProperties.queryStringObject.id === "string" &&
      requestProperties.queryStringObject.id.trim().length === 20
         ? requestProperties.queryStringObject.id
         : false;

   if (id) {
      // lookup the user
      data.read("tokens", id, (err, tokenData) => {
         const token = { ...parseJSON(tokenData) };
         if (!err && token) {
            callback(200, token);
         } else {
            callback(404, {
               message: "Requested token was not found",
            });
         }
      });
   } else {
      callback(404, {
         message: "Requested token was not found",
      });
   }
};
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
handler.token.put = (requestProperties, callback) => {
   const id =
      typeof requestProperties.body.id === "string" &&
      requestProperties.body.id.trim().length === 20
         ? requestProperties.body.id
         : false;
   const extend =
      typeof requestProperties.body.extend === "boolean" &&
      requestProperties.body.extend === true
         ? true
         : false;

   if (id && extend) {
      data.read("tokens", id, (err1, tokenData) => {
         let tokenObject = parseJSON(tokenData);
         if (tokenObject.expires > Date.now()) {
            tokenData.expires = Date.now() + 60 * 60 * 1000;
            // store the updated token
            data.update("tokens", id, tokenObject, (err2) => {
               if (!err2) {
                  callback(200, {
                     message: "Token extend successfully!",
                  });
               } else {
                  callback(500, {
                     error: "There is error in server!",
                  });
               }
            });
         } else {
            callback(400, {
               error: "Token already expired!",
            });
         }
      });
   } else {
      callback(400, {
         error: "Requested token problem!",
      });
   }
};
// @TODO: Authentication
handler.token.delete = (requestProperties, callback) => {
   // check the phone number if valid
   const id =
      typeof requestProperties.queryStringObject.id === "string" &&
      requestProperties.queryStringObject.id.trim().length === 20
         ? requestProperties.queryStringObject.id
         : false;
   if (id) {
      // lookup the user
      data.read("tokens", id, (err, tokenData) => {
         if (!err && tokenData) {
            data.delete("tokens", id, (err1) => {
               if (!err1) {
                  callback(200, {
                     message: "Token deleted successfully",
                  });
               } else {
                  callback(500, {
                     message: "There was a server side error",
                  });
               }
            });
         } else {
            callback(500, {
               error: "There was a server side error!",
            });
         }
      });
   } else {
      callback(400, {
         error: "There was a problem in your result!",
      });
   }
};
module.exports = handler;
