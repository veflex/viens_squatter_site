// @root/api/user.js

const noteAPI = function noteAPI(connection) {
  const router = require("express").Router();
  const noteModel = require("../model/note")(connection);

  router.post('/note', (req, res) => {
      noteModel.vote((err, dataset) => {
          res.send(dataset);
      }, req.body); // post datas ici ...
  });

  router.get('/note', (req, res) => {
      noteModel.getNote((err, dataset) => {
          res.send(dataset);
      }, req.params.id);
  });

  router.get('/top', (req, res) => {
      noteModel.getTop((err, dataset) => {
          res.send(dataset);
      }, req.params.id);
  });

  router.delete('/note', (req, res) => {
      noteModel.remove((err, dataset) => {
          if (err) return res.status(500).send(err);
          return res.status(200).send(dataset);
      }, req.params.id); // id de l'note ici ...
  });

  router.patch('/note', (req, res) => {
      noteModel.update((err, dataset) => {
          if (err) return res.status(500).send(err);
          else return res.status(200).send(dataset);
      }, {
          note: req.body.note,
          id: req.params.id
      });
  });

  return router;
};

module.exports = noteAPI;
