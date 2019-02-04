// @root/model/user.js
const inscritModel = function inscritModel(connection) {

  const register = function register(clbk, ids) {
    const query = "INSERT INTO `inscrit` (`id_annonce`, `id_user`) VALUES (?, ?)"
    const sql = connection.query(query, [ids.annonce, ids.user], function (error, results, fields) {
        if (error) return clbk(error, null);
        return clbk(null, results);
    });
    console.log(sql.sql);
  }
  const unregister = function unregister(clbk, ids) {
    const query = "DELETE FROM `inscrit` WHERE `id_annonce` = ? AND `id_user` = ?"
    const sql = connection.query(query, [ids.annonce, ids.user], function (error, results, fields) {
        if (error) return clbk(error, null);
        return clbk(null, results);
    });
    console.log(sql.sql);
  }
  const verif = function verif(clbk, ids) {
    const query = "SELECT * FROM `inscrit` WHERE `id_annonce` = ? AND `id_user` = ?"
    const sql = connection.query(query, [ids.annonce, ids.user], function (error, results, fields) {
        if (error) return clbk(error, null);
        return clbk(null, results);
    });
    console.log(sql.sql);
  }

  const getAnnonceReg = function getAnnonceReg(clbk, id) {
    const query = "SELECT u.nickname, u.img, u.id FROM `inscrit` as i INNER JOIN user as u ON i.id_user = u.id WHERE `id_annonce` = ?"
    const sql = connection.query(query, [id], function (error, results, fields) {
        if (error) return clbk(error, null);
        return clbk(null, results);
    });
    console.log(sql.sql);
  }

  const getUserReg = function getUserReg(clbk, id) {
    const query = "SELECT a.id, a.title, a.img, a.datetime, t.img as default_img FROM `inscrit` as i INNER JOIN annonce as a ON i.id_annonce = a.id INNER JOIN theme as t ON a.theme = t.id WHERE `id_user` = ?"
    const sql = connection.query(query, [id], function (error, results, fields) {
        if (error) return clbk(error, null);
        return clbk(null, results);
    });
    console.log(sql.sql);
  }
  return {
    register,
    verif,
    unregister,
    getUserReg,
    getAnnonceReg
  };
};

module.exports = inscritModel;
