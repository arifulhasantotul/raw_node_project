/*
 * Title: worker library
 * Description: worker related files
 * Copyright: Sumit Saha (Learn with Sumit)
 * Date: 22/11/2021
 */

// Dependencies
const http = require("http");
const { handleReqRes } = require("../helpers/handleReqRes");

// worker object - module scaffolding
const worker = {};

// start the createServerVariables
worker.init = () => {
   console.log("worker started");
};

module.exports = worker;
