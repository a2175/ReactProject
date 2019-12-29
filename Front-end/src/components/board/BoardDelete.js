import React, { Component } from 'react';

class BoardDelete extends Component {
  constructor(props){
    super(props);

    this.params = {
      idx : this.props.match.params.idx
    }
  }

  deletePost = e => {
    e.preventDefault();
    var formData = new FormData(e.target);

    var object = {};
    formData.forEach(function(value, key){
        object[key] = value;
    });

    fetch(`/api/board/posts/${this.params.idx}`, {
        method: "POST",
        body: JSON.stringify(object),
        headers: {
            'content-type': "application/json"
        }
    }).then(data => data.text())
      .then(isDeleted => {
        if(isDeleted === "1"){
          alert("완료되었습니다.");
          window.location.href = "/board/pages/1";
        }
        else{
          alert("비밀번호가 일치하지 않습니다.");
        }
      })
  }

  render(){
    return (
      <div className="board_write auto-center">
        <form action={`/api/board/posts/${this.params.idx}`} method="post" onSubmit={this.deletePost}>
        <input type="hidden" name="_method" value="DELETE"/>
        <fieldset><legend>글삭제</legend>
          <h3>글삭제</h3>
          <div className="table">
              <div className="tr">
                  <div className="lbl"><label htmlFor="board_pw">비밀번호</label></div>
                  <div className="desc"><input type="password" id="board_pw" name="pw" size="20" title="비밀번호" required autoFocus/></div>
              </div>
          </div>
          <div className="btn_group">
              <a className="btn-default" href={"/board/posts/"+this.params.idx}>취소</a>
              <button className="btn-submit">완료</button>
          </div>
        </fieldset>
        </form>
      </div>
    );
  }
}

export default BoardDelete;
