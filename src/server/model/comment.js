// @root/model/user.js
const commentModel = function commentModel(connection) {

    const create = function createComment(clbk, data) {
        const q = "INSERT INTO comment (id_author_com, id_annonce_com, comment) VALUES (?, ?, ?)";
        const payload = [data.id_author_com, data.id_annonce_com, data.comment];
        connection.query(q, payload, (err, res, cols) => {
            // console.log(this.sql); // affiche la dernière requête SQL, pratique pour deboguer
            if (err) return clbk(err, null);
            return clbk(null, res);
        });
    };

    const remove = function deleteComment(clbk, id) {
        // la clause SQL IN permet de chercher une valeur dans un tableau
        const q = "DELETE FROM comment WHERE id =?";
        connection.query(q, [id], function (err, res, fields) {
            if (err) return clbk(res, null);
            return clbk(null, res);
        });
    };
    const update = function editComment(clbk, data) {
        console.log(data);
        const q = `UPDATE comment SET comment = ?, updated_at = NOW() WHERE comment.id = ?`;
        const payload = [data.comment, data.id];
        connection.query(q, payload, function (err, res, fields) {
            console.log(this.sql);
            if (err) return clbk(err, null);
            return clbk(null, res);
        });
    };
    const get = function getComments(clbk, id) {
        var query = "SELECT * FROM comment WHERE id=?"
        connection.query(query, id, function (error, results, fields) {
            if (error) return clbk(error, null);
            return clbk(null, results);
        });
    };
    const getAll = function getAllComments(clbk, id) {
        var query = "SELECT * FROM comment"
        connection.query(query, [id], function (error, results, fields) {
            if (error) return clbk(error, null);
            return clbk(null, results);
        });
    };

    const getAllAnnonceComs = function getAllAnnonceComs(clbk, id) {
        console.log(id);
        var query = "SELECT c.id, c.id_author_com, c.created_at, u.nickname, c.comment FROM annonce as a INNER JOIN comment as c ON a.id = c.id_annonce_com INNER JOIN user as u ON c.id_author_com = u.id WHERE a.id = ? ORDER BY c.created_at ASC"
        connection.query(query, [id], function (error, results, fields) {
            console.log(this.sql);
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
        getAllAnnonceComs
    };
};

module.exports = commentModel;
