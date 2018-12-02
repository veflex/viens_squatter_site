// @root/model/user.js
const annonceModel = function annonceModel(connection) {

    const create = function createAnnonce(clbk, data) {
        console.log(data);
        const q = "INSERT INTO annonce (author, theme, title, description, nb_participants, datetime, departement, adresse, img) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        const payload = [data.author, data.theme, data.title, data.description, data.nb_participants, data.datetime, data.departement, data.adresse, data.img];
        connection.query(q, payload, (err, res, cols) => {
            // console.log(this.sql); // affiche la dernière requête SQL, pratique pour deboguer
            if (err) return clbk(err, null);
            return clbk(null, res);
        });
    };

    const remove = function deleteAnnonce(clbk, id) {
        // la clause SQL IN permet de chercher une valeur dans un tableau
        const q = "DELETE FROM annonce WHERE id =?";
        console.log(id);
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
    const get = function getAnnonces(clbk, id) {
        var query = "SELECT * FROM annonce WHERE id=?"
        connection.query(query, id, function (error, results, fields) {
            if (error) return clbk(error, null);
            return clbk(null, results);
        });
    };
    const getAll = function getAllAnnonces(clbk, id) {
        var query = "SELECT * FROM annonce"
        connection.query(query, [id], function (error, results, fields) {
            if (error) return clbk(error, null);
            return clbk(null, results);
        });
    };
    return {
        create,
        remove,
        update,
        get,
        getAll
    };
};

module.exports = annonceModel;
