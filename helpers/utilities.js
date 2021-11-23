/*
 * Title: Utilities helper
 * Description: Utilities helper
 * Copyright: Sumit Saha (Learn with Sumit)
 * Date: 22/11/2021
 */

// module scaffolding
const crypto = require("crypto");
const utilities = {};
const environments = require("./environments");

// parse json string to object
utilities.parseJSON = (jsonString) => {
   let output;

   try {
      output = JSON.parse(jsonString);
   } catch {
      output = {};
   }

   return output;
};

// hashing
utilities.hash = (str) => {
   if (typeof str === "string" && str.length > 0) {
      console.log(environments, process.env.NODE_ENV);
      const hash = crypto
         .createHmac("sha256", environments.secretKey)
         .update(str)
         .digest("hex");

      return hash;
   } else {
      return false;
   }
};
// module export
module.exports = utilities;
