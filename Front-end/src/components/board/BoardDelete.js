import React, { Component } from 'react';
import { getParam } from 'lib';

class BoardDelete extends Component {
  constructor(props){
    super(props);

    this.param = getParam();
  }

  componentDidMount() {
    document.getElementById("submit").addEventListener('click', e => {
      e.preventDefault();

      var pw = document.getElementById("board_pw").value;

      var formData = new FormData();
      formData.append("request", "delete");
      formData.append("pw", pw);
  
      var object = {};
      formData.forEach(function(value, key){
          object[key] = value;
      });
  
      fetch('/api/board/delete/'+this.param.idx, {
          method: "POST",
          body: JSON.stringify(object),
          headers: {
              'content-type': "application/json"
          }
      }).then(data => data.text())
        .then(isDeleted => {
          if(isDeleted === "1"){
            alert("완료되었습니다.");
            window.location.href = "/board";
          }
          else{
            alert("비밀번호가 일치하지 않습니다.");
          }
        })
    });
  }

  render(){
    return (
      <div className="board_write auto-center">
        <fieldset><legend>글삭제</legend>
          <input type="hidden" name="request" value="delete"/>
          <h3>글삭제</h3>
          <div className="table">
              <div className="tr">
                  <div className="lbl"><label htmlFor="board_pw">비밀번호</label></div>
                  <div className="desc"><input type="password" id="board_pw" name="pw" size="20" title="비밀번호" required autoFocus/></div>
              </div>
          </div>
          <div className="btn_group">
              <a className="btn-default" href={"/board/view/"+this.param.idx}>취소</a>
              <button className="btn-submit" id="submit">완료</button>
          </div>
        </fieldset>
      </div>
    );
  }
}

export default BoardDelete;