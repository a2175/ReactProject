var mysql = require('mysql');
var mydb = require(_CONFIG + "database");

var connection = mysql.createConnection(mydb.dbSet);

class commentDAO {

  selectCommentList(request) {
    var sql = "SELECT * FROM comment WHERE board_idx = ? ORDER BY idx";
    var params = [request.params.post_idx];

    var result = new Promise(function(resolve, reject) {
      connection.query(sql, params, function (error, results, fields) {
        resolve(results);
      });
    })

    return result;
  }

  insertComment(request) {
    var sql = "INSERT INTO comment SET name = ?, pw = ?, content = ?, board_idx = ?, date=now()";
    var formData = request.body;
    var params = [formData.name, formData.pw, formData.content, request.params.post_idx];

    var result = new Promise(function(resolve, reject) {
        connection.query(sql, params, function (error, results, fields) {
        resolve();
      });
    })

    return result;
  }

  deleteComment(request) {
    var sql = "DELETE FROM comment WHERE idx = ? AND pw = ?";
    var formData = request.body;
    var params = [request.params.idx, formData.pw];

    var result = new Promise(function(resolve, reject) {
      connection.query(sql, params, function (error, results, fields) {
        resolve(results);
      });
    })

    return result;
  }

}

module.exports = new commentDAO();
