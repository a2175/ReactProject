var mysql = require('mysql');
var mydb = require(_CONFIG + "database");

var connection = mysql.createConnection(mydb.dbSet);

class BoardDAO {

  selectBoardList(request) {
    var nPageIndex = request.params.page_num - 1;
    var nPageRow = 15;

    var START = nPageIndex * nPageRow;
    var END = nPageRow;

    var sql1 = "SELECT *, (SELECT count(IDX) FROM comment WHERE board_idx = board.idx) AS commentNum FROM board ORDER BY idx DESC LIMIT ?, ?;";
    var sql2 = "SELECT count(*) AS count FROM board";
    var params = [START, END];

    var result = new Promise(function(resolve, reject) {
      connection.query(sql1 + sql2, params, function (error, results, fields) {
       resolve(results);
      });
    })

    return result;
  }

  selectBoardSearchList(request) {
    var nPageIndex = request.params.page_num - 1;
    var nPageRow = 15;

    var START = nPageIndex * nPageRow;
    var END = nPageRow;

    var sql1 = "SELECT *, (SELECT count(IDX) FROM comment WHERE board_idx = board.idx) AS commentNum FROM board WHERE subject LIKE CONCAT('%', ?, '%') ORDER BY idx DESC LIMIT ?, ?;";
    var sql2 = "SELECT count(*) AS count FROM board WHERE subject LIKE CONCAT('%', ?, '%')";
    var params = [request.params.keyword, START, END, request.params.keyword];

    var result = new Promise(function(resolve, reject) {
      connection.query(sql1 + sql2, params, function (error, results, fields) {
        resolve(results);
      });
    })

    return result;
  }

  selectBoardDetail(request) {
    var sql = "SELECT * FROM board WHERE idx = ?";
    var params = [request.params.idx];

    var result = new Promise(function(resolve, reject) {
      connection.query(sql, params, function (error, results, fields) {
        resolve(results);
      });
    })

    return result;
  }

  insertBoard(request) {
    var sql = 'INSERT INTO board SET name = ?, pw = ?, subject = ?, content = ?, date=now()';
    var formData = request.body;
    var params = [formData.name, formData.pw, formData.subject, formData.content];

    var result = new Promise(function(resolve, reject) {
      connection.query(sql, params, function (error, results, fields) {
        resolve();
      });
    })

    return result;
  }

  updateBoard(request) {
    var sql = "UPDATE board SET name = ?, subject = ?, content = ? WHERE idx = ? AND pw = ?";
    var formData = request.body;
    var params = [formData.name, formData.subject, formData.content, request.params.idx, formData.pw];

    var result = new Promise(function(resolve, reject) {
      connection.query(sql, params, function (error, results, fields) {
        resolve(results);
      });
    })

    return result;
  }

  deleteBoard(request) {
    var sql = "DELETE FROM board WHERE idx = ? AND pw = ?";
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

module.exports = new BoardDAO();
