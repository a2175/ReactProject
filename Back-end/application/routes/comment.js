var mysql = require('mysql');
var mydb = require(_CONFIG + "database");

module.exports = function CommentController (request, response, param) {
  var connection = mysql.createConnection(mydb.dbSet);

  if(isset(request.body.request)) {
    switch(request.body.request) {
      case 'insert' : insertComment(); break;
      case 'delete' : deleteComment(); break;
    }
  }
  else {
    switch (param.action) {
      case 'view' : selectCommentList(); break;
    }
  }

  function selectCommentList() {
    var sql = "SELECT * FROM comment WHERE board_idx = ? ORDER BY idx";
    var params = [param.idx];

    connection.connect();
    connection.query(sql, params, function (error, results, fields) {
      var list = mydb.toJSON(results);
      var data = {
        list: list,
        totalCount: list.length
      };
      response.send(data);
    });
    connection.end();
  }

  function insertComment() {
    var sql = "INSERT INTO comment SET name = ?, pw = ?, content = ?, board_idx = ?, date=now()";
    var formData = request.body;
    var params = [formData.name, formData.pw, formData.content, param.idx];

    connection.connect();
    connection.query(sql, params, function (error, results, fields) {
        response.end();
    });
    connection.end();
  }


  function deleteComment() {
    var sql = "DELETE FROM comment WHERE idx = ? AND pw = ?";
    var formData = request.body;
    var params = [param.idx, formData.pw];

    connection.connect();
    connection.query(sql, params, function (error, results, fields) {
      var isDeleted = String(results.affectedRows);
      response.send(isDeleted);
    });
    connection.end();
  }
}
