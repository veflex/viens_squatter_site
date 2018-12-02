// @root/model/user.js
const messageModel = function messageModel(connection) {

    const create = function createMessage(clbk, data) {
        const q = "INSERT INTO message (id_author_msg, id_receiver_msg, message) VALUES (?, ?, ?)";
        const payload = [data.id_author_msg, data.id_receiver_msg, data.message];
        connection.query(q, payload, (err, res, cols) => {
            if (err) return clbk(err, null);
            return clbk(null, res);
        });
    };

    const remove = function deleteMessage(clbk, id) {
        // la clause SQL IN permet de chercher une valeur dans un tableau
        const q = "DELETE FROM message WHERE id =?";
        connection.query(q, [id], function (err, res, fields) {
            if (err) return clbk(res, null);
            return clbk(null, res);
        });
    };
    const update = function editMessage(clbk, data) {
        console.log(data);
        const q = `UPDATE message SET message = ?, updated_at = NOW() WHERE message.id = ?`;
        const payload = [data.Message, data.id];
        connection.query(q, payload, function (err, res, fields) {
            console.log(this.sql);
            if (err) return clbk(err, null);
            return clbk(null, res);
        });
    };
    const get = function getMessages(clbk) {
        var sql = "SELECT * FROM message"
        connection.query(sql, function (error, results, fields) {
            if (error) return clbk(error, null);
            return clbk(null, results);
        });
    };
    const getConvo = function getConvo(clbk, id) {
        var sql = "SELECT u.name as 'author', u.id as 'author_id',u2.name as 'receiver', u2.id as 'receiver_id', m.message FROM message as m INNER JOIN user as u ON m.id_author_msg = u.id INNER JOIN user as u2 ON m.id_receiver_msg = u2.id WHERE (id_author_msg = 1 AND id_receiver_msg = 5) OR (id_author_msg = 5 AND id_receiver_msg = 1) ORDER BY created_at ASC"
        const query = connection.query(sql, [id], function (error, results, fields) {
            if (error) return clbk(error, null);
            return clbk(null, results);
        });
        console.log(query.sql);
    };

    return {
        create,
        remove,
        update,
        get,
        getConvo
    };
};

module.exports = messageModel;
