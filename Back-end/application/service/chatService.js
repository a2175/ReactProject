var chatDAO = require(_DAO + "chatDAO");

class chatService {

  async selectChatList() {
    var result = await chatDAO.selectChatList();
    var data = rowsToJson(result);

    return data;
  };

  async insertChat(data) {
    await chatDAO.insertChat(data);
  }

}

module.exports = new chatService();
