var boardDAO = require(_DAO + "boardDAO");

class BoardService {

  async selectBoardList(request) {
    var result = await boardDAO.selectBoardList(request);
    var data = {
      list: rowsToJson(result[0]),
      listNum: result[1][0].count
    };

    return data;
  };

  async selectBoardSearchList(request) {
    var result = await boardDAO.selectBoardSearchList(request);
    var data = {
      list: rowsToJson(result[0]),
      listNum: result[1][0].count
    };

    return data;
  }

  async selectBoardDetail(request) {
    var result = await boardDAO.selectBoardDetail(request);
    var data = rowsToJson(result)[0];

    return data;
  }

  async insertBoard(request) {
    await boardDAO.insertBoard(request);
  }

  async updateBoard(request) {
    var result = await boardDAO.updateBoard(request);
    return String(result.affectedRows);
  }

  async deleteBoard(request) {
    var result = await boardDAO.deleteBoard(request);
    return String(result.affectedRows);
  }

}

module.exports = new BoardService();
