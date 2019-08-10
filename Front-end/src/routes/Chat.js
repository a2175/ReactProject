import React, { Component } from 'react';

class Chat extends Component{
    constructor(props){
        super(props);
        
		this.state = {
            data: null
        };
    }

    fetchData() {
        fetch('/api/chat/view', {
            method: "POST"
            }).then(res => res.json())
              .then(data => this.setState({ data: data }))
    }

    componentDidMount() {
        this.fetchData();
              
        setInterval( () =>
            this.fetchData()
        , 1500)
    }

    shouldComponentUpdate(nextProps, nextState) {
        var data = JSON.stringify(this.state.data);
        var nextData = JSON.stringify(nextState.data);

        if(data  !== nextData)
            return true;
        else
            return false;
    }

    componentWillUpdate(nextProps, nextState) {
        this.prevScrollHeight = document.getElementById("chat_list").scrollHeight;
    }

    componentDidUpdate(prevProps, prevState) {
        var body = document.getElementById("chat_list");

        if(body.scrollTop === (this.prevScrollHeight - body.offsetHeight)) // 현재 스크롤바가 끝에 위치한다면
            body.scrollTop = body.scrollHeight; // 자동으로 스크롤을 끝으로 위치시킨다
        
        if(prevState.data === null) // 최초로 채팅 사이트 접속시
            body.scrollTop = body.scrollHeight; // 자동으로 스크롤을 끝으로 위치시킨다
    }

    componentWillUnmount(){
        console.log("componentWillUnmount");
      }

    fn_checkComment(name, content) {
        if(name.length === 0) { alert("닉네임을 입력해주세요."); return false; }
        if(content.length === 0) { alert("내용을 입력해주세요."); return false; }

        return true;
    }

    insertChat() {
        var name = document.getElementById("name").value;
        var content = document.getElementById("content").value;

        if(this.fn_checkComment(name, content)) {
            var formData = new FormData();
            formData.append("request", "insert");
            formData.append("name", name);
            formData.append("content", content);

            var object = {};
            formData.forEach(function(value, key){
                object[key] = value;
            });

            fetch("/api/chat/write", {
                method: "POST",
                body: JSON.stringify(object),
                headers: {
                    'content-type': "application/json"
                }
            }).then(() => this.fetchData)
            
            document.getElementById("content").value = '';
            document.getElementById("content").focus();
        }
    }

    onKeyDown = e => {
        if (e.keyCode === 13) {
            e.preventDefault();
            this.insertChat();
        }
    }

    onClick = e => {
        e.preventDefault();
        this.insertChat();
    }

    render(){
        var lists = [];
        var data = this.state.data;

        for(var key in data) {
            lists.push(<div className='tr' key={data[key].idx}>
                        <div className='lbl'> {data[key].name} </div>
                        <div className='desc'> {data[key].content} </div>
                        <div className='date'> {data[key].date.replace('T', ' ').substr(0, 19)} </div>
                        <input type='hidden' id='idx' value={data[key].idx} />
                       </div>
            );
        };
       
        return (
            <div id="chat">
                <div className="auto-center">
                    <div id="chat_list" className="chat_list">
                        <div className='table'>
                            {lists}
                        </div>
                    </div>

                    <div className="submit_chat">
                        <span className="input"><input type="text" id='name' placeholder="닉네임" autoFocus /></span>
                        <span className="desc"><textarea id="content" rows="5" placeholder="내용" onKeyDown={this.onKeyDown}></textarea></span>
                        <div className="btn_group">
                            <button className="btn-submit" id="submit" onClick={this.onClick}>등록</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
  }

export default Chat;
