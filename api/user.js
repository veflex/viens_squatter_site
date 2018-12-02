/*jshint esversion :  6 */

// @root/api/country.js

const userAPI = function userAPI(connection) {
    const router = require("express").Router();
    const userModel = require("../model/user")(connection);

    router.get('/user/:id', (req, res) => {
        userModel.getOne((err, dataset) => {
            res.send(dataset);
        }, req.params.id);
    });

    router.get('/user', (req, res) => {
        userModel.getAll((err, dataset) => {
            res.send(dataset);
        }, null);
    });

    router.post('/user', (req, res) => {
        userModel.create((err, dataset) => {
            res.send(dataset);
        }, req.body); // post datas ici ...
    });

    router.delete('/user/:id', (req, res) => {
        userModel.remove((err, dataset) => {
            if (err) return res.status(500).send(err);
            return res.status(200).send(dataset);
        }, req.params.id);
    });

    router.patch('/user/:id', (req, res) => {
        userModel.update((err, dataset) => {
            if (err) return res.status(500).send(err);
            else return res.status(200).send(dataset);
        }, {
            body: req.body,
            id: req.params.id
        });
    });

    return router;
};

module.exports = userAPI;
