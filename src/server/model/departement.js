// @root/model/user.js
const departementModel = function departementModel(connection) {

  //get all departements
  const getAll = function getAllDepartements(clbk) {
      const query = "SELECT * FROM departement as d WHERE d.code = 75 OR d.code = 91 OR d.code = 92 OR d.code = 93 OR d.code = 94 OR d.code = 95 OR d.code = 77 OR d.code = 78"
      connection.query(query, function (error, results, fields) {
          if (error) return clbk(error, null);
          return clbk(null, results);
      });
  };
  return {
      getAll
  };
};

module.exports = departementModel;
