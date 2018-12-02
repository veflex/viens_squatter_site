// @root/api/user.js

const annonceUserAPI = function annonceUserAPI(connection) {
    const router = require("express").Router();
    const annonceModel = require("../model/annonce_user")(connection);

    router.get('/annonce_user', (req, res) => {
        annonceModel.getAll((err, dataset) => {
            res.send(dataset);
        }, null);
    });

    router.get('/annonce_user/:id', (req, res) => {
        annonceModel.getAnnonceUser((err, dataset) => {
            res.send(dataset);
        }, req.params.id);
    });

    router.get('/user_annonce/:id', (req, res) => {
        annonceModel.getUserAnnonce((err, dataset) => {
            res.send(dataset);
        }, req.params.id);
    });

    return router;
};

module.exports = annonceUserAPI;
