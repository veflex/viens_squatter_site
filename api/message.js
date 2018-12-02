// @root/api/user.js

const messageAPI = function messageAPI(connection) {
    const router = require("express").Router();
    const messageModel = require("../model/message")(connection);

    router.post('/message', (req, res) => {
        messageModel.create((err, dataset) => {
            res.send(dataset);
        }, req.body); // post datas ici ...
    });

    router.get('/conversation', (req, res) => {
        messageModel.getConvo((err, dataset) => {
            res.send(dataset);
        }, null);
    });
    router.get('/message', (req, res) => {
        messageModel.get((err, dataset) => {
            res.send(dataset);
        }, null);
    });
    router.get('/message_annonce/:id', (req, res) => {
        messageModel.getAllAnnonceComs((err, dataset) => {
            res.send(dataset);
        }, req.params.id);
    });

    router.get('/message/:id', (req, res) => {
        messageModel.get((err, dataset) => {
            res.send(dataset);
        }, req.params.id);
    });

    router.delete('/message/:id', (req, res) => {
        messageModel.remove((err, dataset) => {
            if (err) return res.status(500).send(err);
            return res.status(200).send(dataset);
        }, req.params.id); // id de l'message ici ...
    });

    router.patch('/message/:id', (req, res) => {
        messageModel.update((err, dataset) => {
            if (err) return res.status(500).send(err);
            else return res.status(200).send(dataset);
        }, {
            message: req.body.message,
            id: req.params.id
        });
    });

    return router;
};

module.exports = messageAPI;
