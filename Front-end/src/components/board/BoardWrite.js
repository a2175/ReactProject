import React, { Component } from 'react';

class BoardWrite extends Component {
  render(){
    return (
      <div className="board_write auto-center">
          <form action="/api/board/posts" method="post">
          <fieldset>
            <legend>글작성</legend>
              <h3>글작성</h3>
              <div className="table">
                  <div className="tr">
                      <div className="lbl"><label htmlFor="board_name">작성자</label></div>
                      <div className="desc"><input type="text" id="board_name" name="name" size="20" title="작성자" required autoFocus/></div>
                  </div>
                  <div className="tr">
                      <div className="lbl"><label htmlFor="board_pw">비밀번호</label></div>
                      <div className="desc"><input type="password" id="board_pw" name="pw" size="20" title="비밀번호" required/></div>
                  </div>
                  <div className="tr">
                      <div className="lbl"><label htmlFor="board_subject">제목</label></div>
                      <div className="desc"><input type="text" id="board_subject" name="subject" size="80" title="제목" required/></div>
                  </div>
                  <div className="tr">
                      <div className="lbl"><label htmlFor="board_content">내용</label></div>
                      <div className="desc"><textarea id="board_content" name="content" cols="80" rows="10" title="내용" required></textarea></div>
                  </div>
              </div>
              <div className="btn_group">
                  <a className="btn-default" href="/board/pages/1">취소</a>
                  <button className="btn-submit" id="submit">완료</button>
              </div>
          </fieldset>
          </form>
      </div>
    );
  }
}

export default BoardWrite;
