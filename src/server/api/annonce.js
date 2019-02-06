// @root/api/user.js

const annonceAPI = function annonceAPI(connection) {
    const router = require("express").Router();
    const annonceModel = require("../model/annonce")(connection);
    const multer = require('multer')
    const storage = multer.diskStorage({
        destination: function(req, file, cb) {
            console.log(req.body);
          cb(null, "src/assets/annonce_img/");
        },
        filename: function(req, file, cb) {
          cb(null, Date.now() + "_" + file.originalname);
        }
      });
      
      const upload = multer({ storage });
      

    router.post('/annonce', upload.single("uploader"), (req, res) => {
        if (req.file){
            req.body["img"] = req.file.filename;
        } else {
            req.body["img"] = null; 
        }
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
    router.get('/annonce_og/:id', (req, res) => {
        annonceModel.getOg((err, dataset) => {
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

    router.patch('/annonce/:id',upload.single("uploader"), (req, res) => {
        if (req.file){
            req.body["img"] = req.file.filename;
        } else if (req.body["img"] === 'null'){
            req.body["img"] = null
        }
        annonceModel.update((err, dataset) => {
            if (err) return res.status(500).send(err);
            else return res.status(200).send(dataset);
        },req.body);
    });

    return router;
};

module.exports = annonceAPI;
