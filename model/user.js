/* jshint esversion : 6 */

// @root/model/marques.js

const userModel = function userModel(connection) {
    const getOne = function getUser(clbk, id) {
        var sql;
        sql = 'SELECT * FROM `user` WHERE id = ?';
        connection.query(sql, [id], (error, results, fields) => {
            // console.log(this.sql); // affiche la dernière requête SQL, pratique pour deboguer
            if (error) return clbk(error, null);
            return clbk(null, results);
        });
    };

    const getAll = function getAllUsers(clbk, id) {
        var sql;
        sql = 'SELECT * FROM `user`';
        connection.query(sql, (error, results, fields) => {
            // console.log(this.sql); // affiche la dernière requête SQL, pratique pour deboguer
            if (error) return clbk(error, null);
            return clbk(null, results);
        });
    };



    const create = function createUser(clbk, data) {
        console.log(data);
        const q = "INSERT INTO user (name,nickname,email,password, departement, sexe, img) VALUES (?,?,?,?,?,?,?)";
        connection.query(q, [data.name, data.nickname, data.email, data.password, data.departement, data.sexe, data.img], (err, res, cols) => {
            if (err) return clbk(err, null);
            return clbk(null, res);
        });
    };

    const remove = function deleteUser(clbk, id) {
        // la clause SQL IN permet de chercher une valeur dans un tableau
        const q = " DELETE FROM `user` WHERE `user`.`id` = ?";

        connection.query(q, id, function (err, res, fields) {
            if (err) return clbk(res, null);
            return clbk(null, res);
        });
    };

    const update = function editUser(clbk, data) {
        const body = data.body;
        const param = Object.keys(body)[0];
        const value = body[param]
        const q = `UPDATE user SET ${param} = ? WHERE user.id = ?`;
        const payload = [value, data.id];
        connection.query(q, payload, function (err, res, fields) {
            if (err) return clbk(err, null);
            return clbk(null, res);
        });
    };

    return {
        getOne,
        getAll,
        create,
        remove,
        update
    };
};

module.exports = userModel;
