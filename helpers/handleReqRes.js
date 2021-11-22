/*
 * Title: Req Res
 * Description: Handle request and response
 * Copyright: Sumit Saha (Learn with Sumit)
 * Date: 22/11/2021
 */

// Dependencies
const url = require("url");
const { StringDecoder } = require("string_decoder");
const routes = require("../routes");
const {
   notFoundHandler,
} = require("../handlers/routeHandlers/notFoundHandler");

// app object - module scaffolding
const handler = {};

handler.handleReqRes = (req, res) => {
   // request handle
   // get the url an parse it
   const parsedUrl = url.parse(req.url, true);
   const path = parsedUrl.pathname;
   // using RegEX to remove slash(/) from start and from end
   const trimmedPath = path.replace(/^\/+|\/+$/g, "");
   const method = req.method.toLowerCase();
   const queryStringObject = parsedUrl.query;
   const headersObject = req.headers;

   const requestProperties = {
      parsedUrl,
      path,
      trimmedPath,
      method,
      queryStringObject,
      headersObject,
   };

   const decoder = new StringDecoder("utf-8");
   let realData = ``;

   const chosenHandler = routes[trimmedPath]
      ? routes[trimmedPath]
      : notFoundHandler;

   req.on("data", (buffer) => {
      realData += decoder.write(buffer);
   });
   req.on("end", () => {
      realData += decoder.end();

      chosenHandler(requestProperties, (statusCode, payLoad) => {
         statusCode = typeof statusCode === "number" ? statusCode : 500;
         payLoad = typeof payLoad === "object" ? payLoad : {};

         const payLoadString = JSON.stringify(payLoad);

         // return the final response
         res.writeHead(statusCode);
         res.end(payLoadString);
      });
      // response handle
      res.end("Hello bro");
   });
};

module.exports = handler;
