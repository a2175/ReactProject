var mysql = require('mysql');
var mydb = require(_CONFIG + "database");

module.exports = function ChatController(request, response, param) {
  var connection = mysql.createConnection(mydb.dbSet);

  if(isset(request.body.request)) {
    switch(request.body.request) {
      case 'insert' : insertChat(); break;
    }
  }
  else {
    switch(param.action){
      case 'view' : selectChatList(); break;
    }
  }

  function selectChatList() {
    var sql = "SELECT * FROM chat";

    connection.connect();
    connection.query(sql, function (error, results, fields) {
      var data = mydb.toJSON(results);
      response.send(data);
    });
    connection.end();
  }

  function insertChat() {
    var sql = "INSERT INTO chat SET name = ?, content = ?, date=now()";
    var formData = request.body;
    var params = [formData.name, formData.content];

    connection.connect();
    connection.query(sql, params, function (error, results, fields) {
        response.end();
    });
    connection.end();
  }
}
