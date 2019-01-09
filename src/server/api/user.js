/*jshint esversion :  6 */

// @root/api/country.js

const userAPI = function userAPI(connection) {
    const router = require("express").Router();
    const userModel = require("../model/user")(connection);
    const bcrypt = require("bcrypt");
    const auth = require("./../utils/auth");



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

    router.get('/user/note', (req, res) => {
        userModel.getVote((err, dataset) => {
            res.send(dataset);
        }, null);
    });

    router.post('/user', (req, res) => {
        const { name, nickname, sexe, email, password, img } = req.body;
        const newUser = { name, nickname, sexe, email, img };
        bcrypt.hash(password, 10).then(hash => {
            newUser.password = hash;
            userModel.create((err, dataset) => {
                if (err) {
                    return res.status(401).send(err);
                }
                res.send(dataset);
            }, newUser); // post datas ici ...
        }).catch(err => {
            return res.status(500).send(err);
          });
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

    router.post("/user/login", (req, res) => {
        console.log(req.body);
        // on récupère l'user par son mail
        userModel.getByMail((err, user) => {      
          // si erreur interne au serveur, retourner l'erreur au client
          if (err) return res.status(500).send(err);
          // sinon si le mail n'existe pas en bdd, retourner une erreur au client
          else if (!user) return res.status(401).send("Email ou Pseudo inconnu");  
          // sinon  le mail a été trouvé, comparer le password avec son crypt/salt
          bcrypt.compare(req.body.user.password, user.password).then(function(match) {
            // si le password est invalide, retourner une erreur au client
            if (!match) return res.status(401).send("Mot de passe incorrect");         
            // tout est ok => retourner l'objet user (sans password, etc.) au client
            // accompagné d'un token dans l'entête HTTP pour sécuriser l'accès au dashboard.  
            user = auth.removeSensitiveInfo(user);
            const token = auth.createToken(user, req.ip);
            return res.header("x-authenticate", token).status(200).send({user, token});  
          }).catch(err => {
            console.log("@catch", err)
            res.status(500).send(err);
          }); // si bcrypt a planté, => erreur au client
  
        }, req.body.user.id);
      });

    return router;
};

module.exports = userAPI;
