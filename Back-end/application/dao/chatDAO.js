var mysql = require('mysql');
var mydb = require(_CONFIG + "database");

var connection = mysql.createConnection(mydb.dbSet);

class chatDAO {

  selectChatList() {
    var sql = "SELECT * FROM chat";

    var result = new Promise(function(resolve, reject) {
      connection.query(sql, function (error, results, fields) {
        resolve(results);
      });
    })

    return result;
  }

  insertChat(data) {
    var sql = "INSERT INTO chat SET name = ?, content = ?, date=now();";
    var params = [data.name, data.content];

    var result = new Promise(function(resolve, reject) {
      connection.query(sql, params, function (error, results, fields) {
        resolve();
      });
    })

    return result;
  }

}

module.exports = new chatDAO();
