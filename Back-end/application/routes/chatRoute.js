var express = require('express');
var router = express.Router();

var chatService = require(_SERVICE + "chatService");

module.exports = function(server) {
  var io = require('socket.io')(server);

  io.on('connection', function(socket) {

    socket.on('list', async function(data) {
      var data = await chatService.selectChatList();
      io.emit('list', data);
    });

    socket.on('insert', async function(data) {
      await chatService.insertChat(data);
      io.emit('update', data);
    });

  });

	return router;
};
