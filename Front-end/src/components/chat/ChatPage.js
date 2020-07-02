import React, { Component } from 'react';
import io from "socket.io-client";

class ChatPage extends Component{
    constructor(props){
      super(props);

  		this.state = {
        chatLog: {}
      };

      this.socket = io();
    }

    componentDidMount() {
      this.socket.emit("list");

      this.socket.on("list", (data) => {
        this.setState({ chatLog: data })
      });

      this.socket.on("update", (data) => {
        this.state.chatLog.push(data)
        this.setState({ chatLog: this.state.chatLog })
      });
    }

    componentWillUpdate(nextProps, nextState) {
      this.prevScrollHeight = this.chatListDiv.scrollHeight;
    }

    componentDidUpdate(prevProps, prevState) {
      var body = this.chatListDiv;

      if(body.scrollTop === (this.prevScrollHeight - body.offsetHeight)) // 현재 스크롤바가 끝에 위치한다면
        body.scrollTop = body.scrollHeight; // 자동으로 스크롤을 끝으로 위치시킨다

      if(typeof(prevState.chatLog.length) === "undefined") // 최초로 채팅 사이트 접속시
        body.scrollTop = body.scrollHeight; // 자동으로 스크롤을 끝으로 위치시킨다
    }

    onKeyDown = e => {
      if (e.keyCode === 13) {
        e.preventDefault();
        this.chatSubmitButton.click()
      }
    }

    submitChat = e => {
      e.preventDefault();
      var formData = new FormData(e.target);
      formData.append('date', this.now());

      this.socket.emit("insert", Object.fromEntries(formData));

      this.chatContentTextarea.value = '';
      this.chatContentTextarea.focus();
    }

    now() {
      var date = new Date();
      var m = date.getMonth()+1;
      var d = date.getDate();
      var h = date.getHours();
      var i = date.getMinutes();
      var s = date.getSeconds();
      return date.getFullYear()+'-'+(m>9?m:'0'+m)+'-'+(d>9?d:'0'+d)+' '+(h>9?h:'0'+h)+':'+(i>9?i:'0'+i)+':'+(s>9?s:'0'+s);
    }

    getChatList() {
      var list = [];
      var data = this.state.chatLog;

      for(var key in data) {
        list.push(
          <div className='tr' key={key}>
            <div className='lbl'> {data[key].name} </div>
            <div className='desc'> {data[key].content} </div>
            <div className='date'> {data[key].date.replace('T', ' ').substr(0, 19)} </div>
          </div>
        );
      };

      return list;
    }

    render(){
      return (
        <div id="chat">
          <div className="auto-center">
            <div id="chat_list" className="chat_list" ref={(ref) => {this.chatListDiv = ref}}>
              <div className='table'>
                  {this.getChatList()}
              </div>
            </div>

            <form id="form" action="" method="post" onSubmit={this.submitChat}>
              <div className="submit_chat">
                <span className="input"><input type="text" id="name" name="name" placeholder="닉네임" autoFocus required /></span>
                <span className="desc"><textarea id="content" name="content" ref={(ref) => {this.chatContentTextarea = ref}} rows="5" placeholder="내용" onKeyDown={this.onKeyDown} required></textarea></span>
                <div className="btn_group">
                  <button className="btn-submit" id="submit" ref={(ref) => {this.chatSubmitButton = ref}}>등록</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )
    }
  }

export default ChatPage;
