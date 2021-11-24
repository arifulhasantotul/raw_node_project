/*
 * Title: Environment
 * Description: Handle all environment
 * Copyright: Sumit Saha (Learn with Sumit)
 * Date: 22/11/2021
 */

// Dependencies

// module scaffolding
const environments = {};
require("dotenv").config();

environments.staging = {
   port: 3000,
   envName: "staging",
   secretKey: "asdfsa",
   maxChecks: 5,
   twilio: {
      fromPhone: "+14155552671",
      accountSid: process.env.accountSid,
      authToken: process.env.authToken,
   },
};
environments.production = {
   port: 5000,
   envName: "production",
   secretKey: "ljljljji",
   maxChecks: 5,
   twilio: {
      fromPhone: "+14155552671",
      accountSid: process.env.accountSid,
      authToken: process.env.authToken,
   },
};

// determine which environment was passed
const currentEnvironment =
   typeof process.env.NODE_ENV === "string" ? process.env.NODE_ENV : "staging";

// export corresponding environment object
console.log(currentEnvironment);
console.log(typeof environments?.currentEnvironment);
// const environmentToExport =
//    currentEnvironment === "staging"
//       ? environments.staging
//       : environments.production;
const environmentToExport =
   typeof environments[currentEnvironment] === "object"
      ? environments[currentEnvironment]
      : environments.staging;

console.log(environmentToExport);
// export module
module.exports = environmentToExport;
