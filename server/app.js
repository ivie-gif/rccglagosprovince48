"use strict";
const express = require("express");
const AppConfig = require("./config");
const bodyParser = require("body-parser");
const history = require("connect-history-api-fallback");
const cors = require("cors");
const helmet = require("helmet");
const app = express();
const path = require("path");
const fs = require('fs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(history());

// Custom middleware to log requests
// app.use(function (req, res, next) {
// console.log(`Request - Method: ${req.method}, URL: ${req.url}`);
// res.on('finish', () => {
//   console.log(`Response - Status: ${res.statusCode}`);
// });
// next();
// });
app.use(cors({ origin: true, credentials: true }));
app.use(helmet());
app.use(express.static(path.resolve(__dirname, "../app")));
app.all('*', function (req, res) {
  res.pipe(fs.createReadStream(path.resolve(__dirname, "../app/index.html")));
});


let port = AppConfig.App.PORT || 3000;

app.listen(port, () => {
  console.log("Express server listening on port " + port);
});