// @root/model/user.js
const annonceUserModel = function annonceUserModel(connection) {


    const getAll = function getAllAnnonces(clbk) {
        var query = "SELECT * FROM annonce as a INNER JOIN user as u ON a.author = u.id"
        connection.query(query, function (error, results, fields) {
            if (error) return clbk(error, null);
            return clbk(null, results);
        });
    };
    const getAnnonceUser = function getAnnonceUser(clbk, id) {
        var query = "SELECT a.id as 'id_annonce', a.title, a.description, a.datetime, a.departement, a.adresse, a.img, u.nickname, u.name, t.name as 'theme' FROM annonce as a INNER JOIN user as u ON a.author = u.id INNER JOIN theme as t ON t.id = a.theme WHERE u.id = ?"
        connection.query(query, id, function (error, results, fields) {
            console.log(this.sql);
            if (error) return clbk(error, null);
            return clbk(null, results);
        });
    };
    const getUserAnnonce = function getUserAnnonce(clbk, id) {
        var query = "SELECT * FROM user as u INNER JOIN annonce as a ON u.id = a.author WHERE u.id = ?"
        connection.query(query, id, function (error, results, fields) {
            if (error) return clbk(error, null);
            return clbk(null, results);
        });
    };
    return {
        getAll,
        getAnnonceUser,
        getUserAnnonce
    };
};



module.exports = annonceUserModel;
