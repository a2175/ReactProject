import React, { Component } from 'react';
import { getParam } from 'lib';

class BoardUpdate extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      data: null
    };

    this.param = getParam();
  }

  componentDidMount() {
    fetch('/api/board/view/'+this.param.idx, {
      method: "POST"
      }).then(res => res.json())
        .then(data => this.setState({ data: data }))
  }

  componentDidUpdate(prevProps, prevState) {
    document.getElementById("submit").addEventListener('click', e => {
      e.preventDefault();

      var name = document.getElementById("board_name").value;
      var pw = document.getElementById("board_pw").value;
      var subject = document.getElementById("board_subject").value;
      var content = document.getElementById("board_content").value;

      var formData = new FormData();
      formData.append("request", "update");
      formData.append("name", name);
      formData.append("pw", pw);
      formData.append("subject", subject);
      formData.append("content", content);
  
      var object = {};
      formData.forEach(function(value, key){
          object[key] = value;
      });
  
      fetch('/api/board/update/'+this.param.idx, {
          method: "POST",
          body: JSON.stringify(object),
          headers: {
              'content-type': "application/json"
          }
      }).then(data => data.text())
        .then(isUpdated => {
          if(isUpdated === "1"){
            alert("완료되었습니다.");
            window.location.href = "/board/view/"+this.param.idx;
          }
          else{
            alert("비밀번호가 일치하지 않습니다.");
          }
        })
    });
  }

  render(){
    var detail = "";
    if(this.state.data !== null){
      detail = (<div className="table">
                  <div className="tr">
                    <div className="lbl"><label htmlFor="board_name">작성자</label></div>
                    <div className="desc"><input type="text" id="board_name" name="name" size="20" title="작성자" required autoFocus defaultValue={this.state.data.name}/></div>
                  </div>
                  <div className="tr">
                    <div className="lbl"><label htmlFor="board_pw">비밀번호</label></div>
                    <div className="desc"><input type="password" id="board_pw" name="pw" size="20" title="비밀번호" required/></div>
                  </div>
                  <div className="tr">
                    <div className="lbl"><label htmlFor="board_subject">제목</label></div>
                    <div className="desc"><input type="text" id="board_subject" name="subject" size="80" title="제목" required defaultValue={this.state.data.subject}/></div>
                  </div>
                  <div className="tr">
                    <div className="lbl"><label htmlFor="board_content">내용</label></div>
                    <div className="desc"><textarea id="board_content" name="content" cols="80" rows="10" title="내용" required defaultValue={this.state.data.content}></textarea></div>
                  </div>
                </div>
      );
    }

    return (
      <div className="board_write auto-center">
        <fieldset><legend>글수정</legend>
            <input type="hidden" name="request" value="update"/>
            <h3>글수정</h3> 
            {detail}
            <div className="btn_group">
                <a className="btn-default" href={"/board/view/"+this.param.idx}>취소</a>
                <button className="btn-submit" id="submit">완료</button>
            </div>
        </fieldset>
      </div>
    );
  }
}

export default BoardUpdate;