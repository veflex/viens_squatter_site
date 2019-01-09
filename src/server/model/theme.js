// @root/model/user.js
const themeModel = function themeModel(connection) {

    const create = function createTheme(clbk, data) {
        // const q = `INSERT INTO theme (name, img) VALUES (?, ?) WHERE NOT EXISTS (SELECT * FROM theme WHERE theme.name = '${data.name}')`;  
        const q = `INSERT INTO theme (name, img) VALUES (?, ?)`      
        const payload = [data.name, data.img];
        connection.query(q, payload, (err, res, cols) => {
            if (err) return clbk(err, null);
            return clbk(null, res);
        });
    };
    const remove = function deleteTheme(clbk, id) {
        // la clause SQL IN permet de chercher une valeur dans un tableau
        const q = "DELETE FROM theme WHERE id =?";
        connection.query(q, [id], function (err, res, fields) {
            if (err) return clbk(res, null);
            return clbk(null, res);
        });
    };

    const update = function editTheme(clbk, data) {
        const q = `UPDATE theme SET name= ?, img = ? WHERE theme.id = ?`;
        const payload = [data.body.name, data.body.img, data.id];
        connection.query(q, payload, function (err, res, fields) {
            if (err) return clbk(err, null);
            return clbk(null, res);
        });
    };

    const get = function getTheme(clbk, id) {
        var query = "SELECT * FROM theme WHERE id=?"
        connection.query(query, id, function (error, results, fields) {
            if (error) return clbk(error, null);
            return clbk(null, results);
        });
    };
    const getAll = function getAllThemes(clbk) {
        var query = "SELECT * FROM theme"
        connection.query(query, function (error, results, fields) {
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

module.exports = themeModel;
