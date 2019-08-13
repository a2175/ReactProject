import React, { Component } from 'react';
import { getParam } from 'lib';
import delete_button from 'resources/img/delete.jpg';

class BoardDetail extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      detail: null,
      comment: null
    };

    this.param = getParam();
  }
  
  componentDidMount() {
    Promise.all([
      fetch('/api/board/view/'+this.param.idx).then(data => data.json()),
      fetch('/api/comment/view/'+this.param.idx).then(data => data.json())
      ])
      .then((data) => this.setState({ detail: data[0], comment: data[1] }))
  }

  checkComment(name, pw, content) {
    if(name.length === 0) { alert("닉네임을 입력해주세요."); return false; }
    if(pw.length === 0) { alert("비밀번호를 입력해주세요."); return false; }
    if(content.length === 0) { alert("내용을 입력해주세요."); return false; }

    return true;
  }

  insertComment() {
    var name = document.getElementById("name").value;
    var pw = document.getElementById("pw").value;
    var content = document.getElementById("content").value;

    if(this.checkComment(name, pw, content)) {
      var formData = new FormData();
      formData.append("request", "insert");
      formData.append("name", name);
      formData.append("pw", pw);
      formData.append("content", content);

      var object = {};
      formData.forEach(function(value, key){
          object[key] = value;
      });

      fetch('/api/comment/write/'+this.param.idx, {
          method: "POST",
          body: JSON.stringify(object),
          headers: {
              'content-type': "application/json"
          }
      })
      .then(
        fetch('/api/comment/view/'+this.param.idx)
        .then(data => data.json())
        .then((data) => this.setState({ comment: data }))
      )

      document.getElementById("name").value = '';
      document.getElementById("pw").value = '';
      document.getElementById("content").value = '';
    }
  }

  deleteComment(obj) {
    var idx = obj.parentElement.querySelector("#idx").value;
    var pw = obj.querySelector("#commentpw").value;

    var formData = new FormData();
    formData.append("request", "delete");
    formData.append("pw", pw);

    var object = {};
    formData.forEach(function(value, key){
        object[key] = value;
    });

    fetch('/api/comment/delete/'+idx, {
        method: "POST",
        body: JSON.stringify(object),
        headers: {
            'content-type': "application/json"
        }
    })
    .then(data => data.text())
    .then(isDeleted => {
      if(isDeleted === '1'){
        fetch('/api/comment/view/'+this.param.idx)
          .then(data => data.json())
          .then((data) => this.setState({ comment: data }))
        alert("완료되었습니다.");
      }
      else{
        alert("비밀번호가 일치하지 않습니다.");
      }
    })
  }

  submit = e => {
    e.preventDefault();
    this.insertComment();
  }

  opendel = e => {
    e.preventDefault();
    if(document.getElementById("comment_list").querySelector(".btn_group") != null)
      document.getElementById("comment_list").querySelector(".btn_group").remove();

    var div = document.createElement("div");
    div.className = "btn_group";
    var str = "<input type='password' id='commentpw' placeholder='비밀번호'>" +
              "<a id='commentdelete' class='btn-submit comment' href=''>확인</a>" +
              "<a id='commentcencel' class='btn-submit comment' href=''>취소</a>";
    div.innerHTML = str;

    e.target.parentElement.parentElement.appendChild(div);

    document.querySelector("a[id='commentdelete']").addEventListener('click', e => {
        e.preventDefault();
        this.deleteComment(e.target.parentElement);
    }); 

    document.querySelector("a[id='commentcencel']").addEventListener('click', e => {
        e.preventDefault();
        e.target.parentElement.remove();
    });
  }

  render(){
    var detail = "";
    if(this.state.detail !== null){
      detail = (<div className="table">
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

    var lists = [];
    var data = null;
    var listNum = null;
    if(this.state.comment !== null){
      listNum = this.state.comment.totalCount;
      data = this.state.comment.list;
      for(var key in data) {
          lists.push(<div className='tr' key={data[key].idx}> 
                        <div className='lbl'>{data[key].name} </div> 
                        <div className='desc'>{data[key].content}</div> 
                        <div className='date'>{data[key].date.replace('T', ' ').substr(0, 19)}</div> 
                        <div className='delete'>
                          <a href='#this' id='opendel' onClick={this.opendel}>
                            <img src={delete_button} alt="delete button"/>
                          </a>
                          <input type='hidden' id='idx' value={data[key].idx}/>
                        </div> 
                      </div>
          );
      };
    }

    return (
      <div className="board_view auto-center">
        <h3>글보기</h3>
          {detail}
        <div id="comment_list">
          <h4>총 댓글 수 : {listNum}</h4>
          <div className='table'>
            {lists}
          </div>
        </div>
        <div className="submit_comment">
            <span className="input">
                <div className="tr"><input type="text" id='name' placeholder="닉네임"/></div>
                <div className="tr"><input type="password" id='pw' placeholder="비밀번호"/></div>
            </span>
            <span className="desc"><textarea id="content" rows="5" placeholder="내용"></textarea></span>
            <div className="btn_group">
                <button className="btn-submit" id="submit" onClick={this.submit}>등록</button>
            </div>
        </div>
        <div className="btn_group">
            <a className="btn-default" href="/board">목록</a>
            <a className="btn-submit" href={"/board/update/"+this.param.idx}>수정</a>
            <a className="btn-submit" href={"/board/delete/"+this.param.idx}>삭제</a>
        </div>
      </div>
    );
  }
}

export default BoardDetail;