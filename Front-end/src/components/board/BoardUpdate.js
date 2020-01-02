import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class BoardUpdate extends Component {
  constructor(props){
    super(props);

    this.state = {
      detail: {}
    };

    this.params = {
      idx : this.props.match.params.idx
    }
  }

  componentDidMount() {
    fetch(`/api/board/posts/${this.params.idx}`)
      .then(res => res.json())
      .then(data => this.setState({ detail: data }))
  }

  updatePost = e => {
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
      .then(isUpdated => {
        if(isUpdated === "1"){
          alert("완료되었습니다.");
          window.location.href = `/board/posts/${this.params.idx}`;
        }
        else{
          alert("비밀번호가 일치하지 않습니다.");
        }
      })
  }

  getPostDetail() {
    if(Object.keys(this.state.detail).length > 0) {
      return (
        <div className="table">
          <div className="tr">
            <div className="lbl"><label htmlFor="board_name">작성자</label></div>
            <div className="desc"><input type="text" id="board_name" name="name" size="20" title="작성자" required autoFocus defaultValue={this.state.detail.name}/></div>
          </div>
          <div className="tr">
            <div className="lbl"><label htmlFor="board_pw">비밀번호</label></div>
            <div className="desc"><input type="password" id="board_pw" name="pw" size="20" title="비밀번호" required/></div>
          </div>
          <div className="tr">
            <div className="lbl"><label htmlFor="board_subject">제목</label></div>
            <div className="desc"><input type="text" id="board_subject" name="subject" size="80" title="제목" required defaultValue={this.state.detail.subject}/></div>
          </div>
          <div className="tr">
            <div className="lbl"><label htmlFor="board_content">내용</label></div>
            <div className="desc"><textarea id="board_content" name="content" cols="80" rows="10" title="내용" required defaultValue={this.state.detail.content}></textarea></div>
          </div>
        </div>
      );
    }
  }

  render(){
    return (
      <div className="board_write auto-center">
        <form action={`/api/board/posts/${this.params.idx}`} method="post" onSubmit={this.updatePost}>
        <input type="hidden" name="_method" value="PUT"/>
        <fieldset><legend>글수정</legend>
            <h3>글수정</h3>
            {this.getPostDetail()}
            <div className="btn_group">
                <Link className="btn-default" to={"/board/posts/"+this.params.idx}>취소</Link>
                <button className="btn-submit">완료</button>
            </div>
        </fieldset>
        </form>
      </div>
    );
  }
}

export default BoardUpdate;
