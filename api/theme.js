// @root/api/user.js

const themeAPI = function themeAPI(connection) {
    const router = require("express").Router();
    const themeModel = require("../model/theme")(connection);

    router.post('/theme', (req, res) => {
        themeModel.create((err, dataset) => {
            res.send(dataset);
        }, req.body); // post datas ici ...
    });

    router.get('/theme', (req, res) => {
        themeModel.getAll((err, dataset) => {
            res.send(dataset);
        }, null);
    });
    router.get('/theme/:id', (req, res) => {
        themeModel.get((err, dataset) => {
            res.send(dataset);
        }, req.params.id);
    });

    router.delete('/theme/:id', (req, res) => {
        themeModel.remove((err, dataset) => {
            if (err) return res.status(500).send(err);
            return res.status(200).send(dataset);
        }, req.params.id); // id de l'theme ici ...
    });

    router.patch('/theme/:id', (req, res) => {
        themeModel.update((err, dataset) => {
            if (err) return res.status(500).send(err);
            else return res.status(200).send(dataset);
        }, {
            body: {
                name: req.body.name,
                img: req.body.img
            },
            id: req.params.id
        });
    });

    return router;
};

module.exports = themeAPI;
