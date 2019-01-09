// @root/api/user.js

const cityAPI = function cityAPI(connection) {
    const router = require("express").Router();
    const annonceModel = require("../model/city")(connection);

    router.get('/city', (req, res) => {
        annonceModel.getAll((err, dataset) => {
            res.send(dataset);
        }, null);
    });

    return router;
};

module.exports = cityAPI;
