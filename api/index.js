/* jshint esversion : 6 */

// @root/api/index.js

// ROUTAGE DE L'API
const api = function api() {

    const APIVersion = 1; // notre api est en version 1

    const database = require(__dirname + "/../model")({
        password: "", // définition du mot de passe de mySQL
        database: "viens_squatter" // base de donnée cible
    });

    // IMPORT DES ROUTES DE l'API
    const routers = []; // on expotera ce tableau une fois rempli
    // IMPORT DES ROUTES DE L'API USER
    const userRouter = require("./user")(database.connection); // module api user

    // IMPORT DES ROUTES DE l'API ANNONCE
    const annonceRouter = require("./annonce")(database.connection);

    //IMPORT DES ROUTES DE L'API ANONCE INNER USER
    const annonceUserRouter = require("./annonce_user")(database.connection);

    //IMPORT DES ROUTES DE L'API COMMENT
    const commentRouter = require("./comment")(database.connection);

    //IMPORT DES ROUTES DE L'API THEME
    const themeRouter = require("./theme")(database.connection);

    //IMPORT DES ROUTES DE L'API MESSAGE
    const messageRouter = require("./message")(database.connection);



    routers.push(userRouter); // aggrégation des routeurs dans un tableau
    routers.push(annonceRouter); // aggrégation des routeurs dans un tableau
    routers.push(annonceUserRouter); // aggrégation des routeurs dans un tableau
    routers.push(commentRouter); // aggrégation des routeurs dans un tableau
    routers.push(themeRouter); // aggrégation des routeurs dans un tableau
    routers.push(messageRouter); // aggrégation des routeurs dans un tableau

    return { // définition des propriétés publiques du module /api/index.js
        version: APIVersion,
        prefix: `/api/v${APIVersion}`,
        routers: routers
    }; // on récupère ces valeurs dans @root/index.js
};

module.exports = api;
