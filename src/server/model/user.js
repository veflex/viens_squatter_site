/* jshint esversion : 6 */

// @root/model/marques.js

const userModel = function userModel(connection) {
    const getOne = function getUser(clbk, id) {
        var sql;
        sql = 'SELECT * FROM `user` WHERE id = ?';
        connection.query(sql, [id], (error, results, fields) => {
            // console.log(this.sql); // affiche la dernière requête SQL, pratique pour deboguer;
            if (error) return clbk(error, null);
            return clbk(null, results[0]);
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

    const getByMail = function getUserByMail(clbk, id) {
        const sql = `SELECT * FROM user WHERE email = ? OR nickname = ?`;
        const q = connection.query(sql, [id, id], (err, user) => {
          if (err) return clbk(err, null);
          return clbk(null, ...user);
        });
        console.log(q.sql);
    };
    
    const getVote = function getVote(clbk, id) {
        const sql = `SELECT AVG(note) as note, count(note) as nb_votant FROM note WHERE id_is_noted = ?`;
        const q = connection.query(sql, [id], (err, data) => {
          if (err) return clbk(err, null);
          return clbk(null, ...data);
        });
        console.log(q.sql);
    };
    const getTop = function getTop(clbk) {
        const sql = `SELECT AVG(note) as note, count(note) as nb_votant FROM note LIMIT 6`;
        const q = connection.query(sql, (err, data) => {
          if (err) return clbk(err, null);
          return clbk(null, ...data);
        });
        console.log(q.sql);
    };

    const create = function createUser(clbk, data) {
        const q = "INSERT INTO user (name, nickname, sexe, email, password, img) VALUES (?, ?, ?, ?, ?, ?)";
        connection.query(q, [data.name, data.nickname, data.sexe, data.email, data.password, data.img], (err, res, cols) => {
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
        // const body = data.body;
        // const param = Object.keys(body)[0];
        // const value = body[param]
        const {id, name, nickname, sexe, email, img} = data
        const q = 'UPDATE `user` SET `name` = ?, `nickname` = ?, `sexe` = ?, `email` = ?, `img` = ? WHERE `user`.`id` = ?';
        const sql = connection.query(q, [name, nickname, sexe, email, img, id], function (err, res, fields) {
            if (err) return clbk(err, null);
            return clbk(null, res);
        });
        console.log(sql.sql);
    };

    return {
        getOne,
        getAll,
        create,
        remove,
        update,
        getByMail,
        getVote,
        getTop
    };
};

module.exports = userModel;
