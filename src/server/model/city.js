// @root/model/user.js
const cityModel = function cityModel(connection) {

    //get all cities
    const getAll = function getAllCities(clbk) {
        const query = "SELECT * FROM ville as v WHERE v.departement = 75 OR v.departement = 91 OR v.departement = 92 OR v.departement = 93 OR v.departement = 94 OR v.departement = 95 OR v.departement = 77 OR v.departement = 78"
        connection.query(query, function (error, results, fields) {
            if (error) return clbk(error, null);
            return clbk(null, results);
        });
    };
    return {
        getAll
    };
};

module.exports = cityModel;
