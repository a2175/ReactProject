var express = require('express');
var router = express.Router();

var boardService = require(_SERVICE + "boardService");

// 게시글 페이지 불러오기
router.get('/pages/:page_num', async function(request, response) {
  var data = await boardService.selectBoardList(request);
  data.page_num = request.params.page_num;
  response.send(data);
});

// 검색 결과 게시글 페이지 불러오기
router.get('/pages/:page_num/:keyword', async function(request, response) {
  var data = await boardService.selectBoardSearchList(request);
  data.page_num = request.params.page_num;
  data.keyword = request.params.keyword;
  response.send(data);
});

// 게시글 불러오기
router.get('/posts/:idx(\\d+)', async function(request, response, next) {
  var data = await boardService.selectBoardDetail(request);
  data.idx = request.params.idx;
  response.send(data);
});

// 게시글 등록
router.post('/posts', async function(request, response) {
  await boardService.insertBoard(request);
  response.redirect("/board/pages/1");
});

// 게시글 수정
router.put('/posts/:idx', async function(request, response) {
  var isUpdated = await boardService.updateBoard(request);
  response.send(isUpdated);
});

// 게시글 삭제
router.delete('/posts/:idx', async function(request, response) {
  var isDeleted = await boardService.deleteBoard(request);
  response.send(isDeleted);
});

module.exports = router;
