// @root/model/user.js
const noteModel = function noteModel(connection) {

  const vote = function vote(clbk, data) {
      const q = "INSERT INTO `note` (`id_has_noted`, `id_is_noted`, `note`) VALUES (?, ?, ?)";
      const payload = [data.has_noted, data.is_noted, data.note];
      connection.query(q, payload, (err, res, cols) => {
          if (err) return clbk(err, null);
          return clbk(null, res);
      });
  };

  const remove = function deleteNote(clbk, data) {
      // la clause SQL IN permet de chercher une valeur dans un tableau
      const q = "DELETE FROM note WHERE id_has_noted = ? AND id_is_noted = ?";
      connection.query(q, [data.has_noted, data.is_noted], function (err, res, fields) {
          if (err) return clbk(res, null);
          return clbk(null, res);
      });
  };

  const update = function editNote(clbk, data) {
      const q = `UPDATE note SET note = ? WHERE id_has_noted = ? AND id_is_noted = ?`;
      const payload = [data.note, data.has_noted, data.is_noted];
      connection.query(q, payload, function (err, res, fields) {
          console.log(this.sql);
          if (err) return clbk(err, null);
          return clbk(null, res);
      });
  };
  const getVote = function getVote(clbk, id) {
    var sql = '';
    if (id){
      sql = "SELECT AVG(note) as note, count(note) as votant FROM note WHERE id_is_noted = ?"
    } else {
      sql = "SELECT id_is_noted as id_user, u.nickname as pseudo, AVG(note) as note, count(note) as votant FROM note as n INNER JOIN user as u ON n.id_is_noted = u.id GROUP BY id_is_noted ORDER BY note DESC"
    }
      connection.query(sql, [id], function (error, results, fields) {
          if (error) return clbk(error, null);
          return clbk(null, results);
      });
  };

  return {
    vote,
    remove,
    update,
    getVote,
  };
};


module.exports = noteModel;
