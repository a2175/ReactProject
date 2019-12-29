var commentDAO = require(_DAO + "commentDAO");

class commentService {

  async selectCommentList(request) {
    var result = await commentDAO.selectCommentList(request);
    var list = rowsToJson(result);
    var data = {
      list: list,
      totalCount: list.length
    };

    return data;
  };

  async insertComment(request) {
    await commentDAO.insertComment(request);
  }

  async deleteComment(request) {
    var result = await commentDAO.deleteComment(request);
    return String(result.affectedRows);
  }

}

module.exports = new commentService();
