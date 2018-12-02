/* jshint esversion : 6 */

// @root/index.js

const express = require("express");
const port = 3000;
const app = express();
const baseURL = `http://localhost:${port}`;
const api = require(__dirname + "/api")(app);
const http = require("http");
// APP CONFIG !!!
app.use(express.json({
    extended: false
}))
app.use(api.prefix, api.routers);

// TEMPLATE VARS !!!
// Accessibles dans tout le template via app.locals (API express)
app.locals.site = {};
app.locals.baseURL = baseURL;
app.locals.site.title = "EVAL - Gestion de stock";
app.locals.site.description = "eval donnée par notre sensei guillaume (jeremy on t'oublie pas)";

app.locals.marques = []

// ROUTES DES PAGES DE l"APPLICATION


app.get("/", function (req, res) {
    res.send("salut ca va")
});

app.listen(port, function () {
    console.log("node server started on port " + port);
});
