// @root/model/user.js
const annonceModel = function annonceModel(connection) {

    const create = function createAnnonce(clbk, data) {
        const q = "INSERT INTO `annonce` (`author`, `theme`, `title`, `description`, `nb_participants`, `datetime`, `departement`, `ville`, `adresse`, `cedex`, `img`, `created_at`, `updated_at`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)";
        const payload = [data.author, data.theme, data.title, data.description, data.nb_participants, data.date, data.departement, data.city, data.adresse, data.cedex, data.img];
        const que = connection.query(q, payload, (err, res, cols) => {
            // console.log(this.sql); // affiche la dernière requête SQL, pratique pour deboguer
            if (err) return clbk(err, null);
            return clbk(null, res);
        });
        console.log(que.sql);
    };

    const remove = function deleteAnnonce(clbk, id) {
        // la clause SQL IN permet de chercher une valeur dans un tableau
        const q = "DELETE FROM annonce WHERE id =?";
        connection.query(q, [id], function (err, res, fields) {
            if (err) return clbk(res, null);
            return clbk(null, res);
        });
    };
    const update = function editAnnonce(clbk, data) {
        const body = data.body;
        const param = Object.keys(body)[0];
        const value = body[param]
        const q = `UPDATE annonce SET ${param} = ?, updated_at = NOW() WHERE annonce.id = ?`;
        const payload = [value, data.id];
        connection.query(q, payload, function (err, res, fields) {
            console.log(this.sql);
            if (err) return clbk(err, null);
            return clbk(null, res);
        });
    };

    //get 1 annonce with user and theme
    const get = function getAnnonces(clbk, id) {
        const query = "SELECT a.id as 'id_annonce', a.title, a.description, a.datetime, a.departement, a.adresse, a.cedex, a.img, u.nickname, u.name, u.id as 'id_author', t.name as 'theme', d.nom as departement, v.name as ville FROM annonce as a INNER JOIN user as u ON a.author = u.id INNER JOIN theme as t ON t.id = a.theme INNER JOIN departement as d ON a.departement = d.id INNER JOIN ville as v ON a.ville = v.id WHERE a.id = ? "
        // var query = "SELECT * FROM annonce WHERE id=? "
        connection.query(query, id, function (error, results, fields) {
            if (error) return clbk(error, null);
            return clbk(null, results);
        });
    };

    const creatingParams = function (object){
        var params = ' WHERE ';
            for (var propName in object) {
                if(!isNaN(object[propName])){
                    var table = propName.charAt(0)
                    params += `${table}.id = ${object[propName]} AND `
                }
            }
            var lastIndex = params.lastIndexOf(" A");
            params = params.substring(0, lastIndex);
            return params
    }
    //get all annonces with user and theme
    const getAll = function getAllAnnonces(clbk, filter) {
        // var query = "SELECT * FROM annonce ORDER BY created_at ASC";
        var query = "SELECT a.id as 'id_annonce', a.title, a.description, a.datetime, a.departement, a.adresse, a.cedex, a.nb_participants, a.img, u.nickname, u.name, u.id as 'id_author', t.name as 'theme', d.nom as departement, v.name as ville FROM annonce as a INNER JOIN user as u ON a.author = u.id INNER JOIN theme as t ON t.id = a.theme INNER JOIN departement as d ON a.departement = d.id INNER JOIN ville as v ON a.ville = v.id"
        if(Object.values(filter) != 0) {
            query += creatingParams(filter);
        }
        const bendo = connection.query(query, function (error, results, fields) {
            if (error) return clbk(error, null);
            return clbk(null, results);
        });
        console.log(bendo.sql);
    };

    //get all annonce from 1 user
    const getUserAnnonce = function getUserAnnonce(clbk, id) {
        // const query = "SELECT * FROM user as u INNER JOIN annonce as a ON u.id = a.author WHERE u.id = ?";
        const query = "SELECT a.id as 'id_annonce', a.title, a.description, a.datetime, a.departement, a.adresse, a.cedex, a.img, u.nickname, u.name, u.id as 'id_author', t.name as 'theme', d.nom as departement, v.name as ville FROM annonce as a INNER JOIN user as u ON a.author = u.id INNER JOIN theme as t ON t.id = a.theme INNER JOIN departement as d ON a.departement = d.id INNER JOIN ville as v ON a.ville = v.id WHERE u.id = ?"
        connection.query(query, id, function (error, results, fields) {
            if (error) return clbk(error, null);
            return clbk(null, results);
        });
    };
    return {
        create,
        remove,
        update,
        get,
        getAll,
        getUserAnnonce
    };
};

module.exports = annonceModel;
