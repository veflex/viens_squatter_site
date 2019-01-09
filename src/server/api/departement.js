// @root/api/user.js

const departementAPI = function departementAPI(connection) {
  const router = require("express").Router();
  const annonceModel = require("../model/departement")(connection);

  router.get('/departement', (req, res) => {
      annonceModel.getAll((err, dataset) => {
          res.send(dataset);
      }, null);
  });

  return router;
};

module.exports = departementAPI;
