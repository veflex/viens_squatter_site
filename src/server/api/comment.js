// @root/api/user.js

const commentAPI = function commentAPI(connection) {
    const router = require("express").Router();
    const commentModel = require("../model/comment")(connection);

    router.post('/comment', (req, res) => {
        commentModel.create((err, dataset) => {
            res.send(dataset);
        }, req.body); // post datas ici ...
    });

    router.get('/comment', (req, res) => {
        commentModel.getAll((err, dataset) => {
            res.send(dataset);
        }, null);
    });
    router.get('/comment_annonce/:id', (req, res) => {
        commentModel.getAllAnnonceComs((err, dataset) => {
            res.send(dataset);
        }, req.params.id);
    });

    router.get('/comment/:id', (req, res) => {
        commentModel.get((err, dataset) => {
            res.send(dataset);
        }, req.params.id);
    });

    router.delete('/comment/:id', (req, res) => {
        commentModel.remove((err, dataset) => {
            if (err) return res.status(500).send(err);
            return res.status(200).send(dataset);
        }, req.params.id); // id de l'comment ici ...
    });

    router.patch('/comment/:id', (req, res) => {
        commentModel.update((err, dataset) => {
            if (err) return res.status(500).send(err);
            else return res.status(200).send(dataset);
        }, {
            comment: req.body.comment,
            id: req.params.id
        });
    });

    return router;
};

module.exports = commentAPI;
