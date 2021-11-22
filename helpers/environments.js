/*
 * Title: Environment
 * Description: Handle all environment
 * Copyright: Sumit Saha (Learn with Sumit)
 * Date: 22/11/2021
 */

// Dependencies

// module scaffolding
const environments = {};

environments.production = {
   port: 5000,
   envName: "production",
};
environments.staging = {
   port: 8080,
   envName: "staging",
};

// determine which environment was passed
const currentEnvironment =
   typeof process.env.NODE_ENV === "string" ? process.env.NODE_ENV : "staging";

console.log(currentEnvironment);
// export corresponding environment object
const environmentToExport =
   currentEnvironment === "staging"
      ? environments.staging
      : environments.production;

// export module
module.exports = environmentToExport;
