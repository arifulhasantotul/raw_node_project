/*
 * Title: Uptime monitoring application
 * Description: A RESTful API to monitor up or down time of user defined links
 * Copyright: Sumit Saha (Learn with Sumit)
 * Date: 22/11/2021
 */

// Dependencies
const url = require("url");
const { StringDecoder } = require("string_decoder");

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
   const headers = req.headers;

   const decoder = new StringDecoder("utf-8");
   let readData = ``;
   req.on("data", (buffer) => {
      readData += decoder.write(buffer);
   });
   req.on("end", () => {
      readData += decoder.end();
      console.log(readData);
      // response handle
      res.end("Hello bro");
   });
};

module.exports = handler;