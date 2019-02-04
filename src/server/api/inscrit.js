// @root/api/user.js

const inscritAPI = function inscritAPI(connection) {
  const router = require("express").Router();
  const inscritModel = require("../model/inscrit")(connection);

  router.post('/annonce_reg', (req, res) => {
    console.log('registration', req.body);
    inscritModel.register((err, dataset) => {
        res.send(dataset);
    }, req.body);
  });
  router.get('/annonce_reg/:id', (req, res) => {
    inscritModel.getAnnonceReg((err, dataset) => {
        res.send(dataset);
    }, req.params.id);
  });
  router.get('/user_reg/:id', (req, res) => {
    inscritModel.getUserReg((err, dataset) => {
        res.send(dataset);
    }, req.params.id);
  });
  router.post('/annonce_unreg', (req, res) => {
    inscritModel.unregister((err, dataset) => {
        res.send(dataset);
    }, req.body);
  });

  router.post('/verif_reg', (req, res) => {
    inscritModel.verif((err, dataset) => {
        res.send(dataset);
    }, req.body);
  });

  return router;
};

module.exports = inscritAPI;
