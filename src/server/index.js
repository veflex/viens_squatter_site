/* jshint esversion : 6 */

// @root/index.js

const express = require("express");
const cors = require("cors");
const port = 3000;
const app = express();
const api = require(__dirname + "/api")(app);
// const http = require("http");
// APP CONFIG !!!
app.use(express.json({
    extended: false
}))
app.use(cors())
app.use(api.prefix, api.routers);

  
  app.get("/", function (req, res) {
      res.send("salut ca va")
    });

app.listen(port, function () {
    console.log("node server started on port " + port);
});
