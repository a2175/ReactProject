import React, { Component } from 'react';
import delete_button from 'resources/img/delete.jpg';

class BoardDetail extends Component {
  constructor(props){
    super(props);

    this.state = {
      detail: {},
      comment: {}
    };

    this.params = {
      idx : this.props.match.params.idx,
    }
  }

  componentDidMount() {
    Promise.all([
      fetch(`/api/board/posts/${this.params.idx}`).then(data => data.json()),
      fetch(`/api/comment/${this.params.idx}`).then(data => data.json())
    ]).then((data) => this.setState({ detail: data[0], comment: data[1] }))
  }

  commentDeleteUi = e => {
    e.preventDefault();
    if(document.getElementById("comment_list").querySelector(".btn_group") != null)
      document.getElementById("comment_list").querySelector(".btn_group").remove();

    var idx = e.target.parentElement.parentElement.querySelector("#idx").value;
    var div = document.createElement("div");
    div.className = "btn_group";
    var str = `<form id='comment_delete_form' action='/api/comment/${idx}' method='post'>` +
                "<input type='hidden' name='_method' value='DELETE'>" +
                "<input type='password' id='commentpw' name='pw' placeholder='비밀번호' required>" +
                "<button id='commentdelete' class='btn-submit' type='submit'>확인</button>" +
                "<button id='commentcencel' class='btn-submit'>취소</button>" +
              "</form>";
    div.innerHTML = str;

    e.target.parentElement.parentElement.appendChild(div);

    document.getElementById("comment_delete_form").addEventListener('submit', e => {
        e.preventDefault();
        this.deleteComment(e.target);
    });

    document.getElementById("commentcencel").addEventListener('click', e => {
        e.preventDefault();
        e.target.parentElement.remove();
    });
  }

  deleteComment(form) {
    var formData = new FormData(form);
    formData.append("_method", "delete");

    var object = {};
    formData.forEach(function(value, key){
        object[key] = value;
    });

    fetch(form.action, {
        method: "POST",
        body: JSON.stringify(object),
        headers: {
            'content-type': "application/json"
        }
    })
    .then(data => data.text())
    .then(isDeleted => {
      if(isDeleted === '1'){
        fetch('/api/comment/'+this.params.idx)
          .then(data => data.json())
          .then((data) => this.setState({ comment: data }))
        alert("완료되었습니다.");
      }
      else{
        alert("비밀번호가 일치하지 않습니다.");
      }
    })
  }

  submitComment = e => {
    e.preventDefault();
    var formData = new FormData(e.target);

    var object = {};
    formData.forEach(function(value, key){
        object[key] = value;
    });

    fetch('/api/comment/'+this.params.idx, {
        method: "POST",
        body: JSON.stringify(object),
        headers: {
            'content-type': "application/json"
        }
    })
    .then(
      fetch('/api/comment/'+this.params.idx)
      .then(data => data.json())
      .then((data) => this.setState({ comment: data }))
    )

    document.getElementById("name").value = '';
    document.getElementById("pw").value = '';
    document.getElementById("content").value = '';
  }

  getPostDetail() {
    return (
      <div className="table">
        <div className="tr">
            <div className="lbl">작성자</div>
            <div className="desc">{this.state.detail.name}</div>
        </div>
        <div className="tr">
            <div className="lbl">제목</div>
            <div className="desc">{this.state.detail.subject}</div>
        </div>
        <div className="tr">
            <div className="lbl">내용</div>
            <div className="desc content">{this.state.detail.content}</div>
        </div>
      </div>
    );
  }

  getCommentList() {
    var list = [];
    var data = this.state.comment.list;
    for(var key in data) {
        list.push(
          <div className='tr' key={data[key].idx}>
            <div className='lbl'>{data[key].name} </div>
            <div className='desc'>{data[key].content}</div>
            <div className='date'>{data[key].date.replace('T', ' ').substr(0, 19)}</div>
            <div className='delete'>
              <a href='#this' id='opendel' onClick={this.commentDeleteUi}>
                <img src={delete_button} alt="delete button"/>
              </a>
              <input type='hidden' id='idx' value={data[key].idx}/>
            </div>
          </div>
        );
    };
    return list;
  }

  render(){
    return (
      <div className="board_view auto-center">
        <h3>글보기</h3>
          {this.getPostDetail()}
        <div id="comment_list">
          <h4>총 댓글 수 : {this.state.comment.totalCount}</h4>
          <div className='table'>
            {this.getCommentList()}
          </div>
        </div>
        <form id="comment_form" action={`/comment/${this.params.idx}`} method="post" onSubmit={this.submitComment}>
          <div className="submit_comment">
              <span className="input">
                  <div className="tr"><input type="text" id='name' name='name' placeholder="닉네임" required/></div>
                  <div className="tr"><input type="password" id='pw' name='pw' placeholder="비밀번호" required/></div>
              </span>
              <span className="desc"><textarea id='content' name="content" rows="5" placeholder="내용" required></textarea></span>
              <div className="btn_group">
                  <button className="btn-submit" type="submit">등록</button>
              </div>
          </div>
        </form>
        <div className="btn_group">
            <a className="btn-default" href="/board/pages/1">목록</a>
            <a className="btn-submit" href={"/board/posts/"+this.params.idx+"/edit"}>수정</a>
            <a className="btn-submit" href={"/board/posts/"+this.params.idx+"/delete"}>삭제</a>
        </div>
      </div>
    );
  }
}

export default BoardDetail;
