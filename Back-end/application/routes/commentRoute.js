var express = require('express');
var router = express.Router();

var commentService = require(_SERVICE + "commentService");

router.get('/:post_idx', async function(request, response) {
  var data = await commentService.selectCommentList(request);
  response.send(data);
});

router.post('/:post_idx', async function(request, response) {
  await commentService.insertComment(request);
  response.send();
});

router.delete('/:idx', async function(request, response) {
  var isDeleted = await commentService.deleteComment(request);
  response.send(isDeleted);
});

module.exports = router;
