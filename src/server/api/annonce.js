// @root/api/user.js

const annonceAPI = function annonceAPI(connection) {
    const router = require("express").Router();
    const annonceModel = require("../model/annonce")(connection);

    router.post('/annonce', (req, res) => {
        annonceModel.create((err, dataset) => {
            res.send(dataset);
        }, req.body); // post datas ici ...
    });

    router.get('/annonce', (req, res) => {
        annonceModel.getAll((err, dataset) => {
            res.send(dataset);
        }, req.query);
    });

    router.get('/annonce/:id', (req, res) => {
        annonceModel.get((err, dataset) => {
            res.send(dataset);
        }, req.params.id);
    });

    router.get('/user_annonce/:id', (req, res) => {
        annonceModel.getUserAnnonce((err, dataset) => {
            res.send(dataset);
        }, req.params.id);
    });

    router.delete('/annonce/:id', (req, res) => {
        annonceModel.remove((err, dataset) => {
            if (err) return res.status(500).send(err);
            return res.status(200).send(dataset);
        }, req.params.id); // id de l'annonce ici ...
    });

    router.patch('/annonce/:id', (req, res) => {
        annonceModel.update((err, dataset) => {
            if (err) return res.status(500).send(err);
            else return res.status(200).send(dataset);
        }, {
            body: req.body,
            id: req.params.id
        });
    });

    return router;
};

module.exports = annonceAPI;
