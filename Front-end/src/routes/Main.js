import React, { Component } from 'react';

class Main extends Component {
    render(){
      return (
        <section id='main-content'>
            <h1>Main Page</h1>
            <section className='board'>
                <h2>게시판</h2>
                <div>
                    <br/><br/>
                    19-05-26 게시판 글 목록 보기, 게시글 상세보기 구축
                    <br/>
                    19-05-28 게시글 수정, 삭제 구축
                    <br/>
                    19-05-31 게시판 페이징 구축
                    <br/>
                    19-06-02 게시글 검색기능 구축
                    <br/>
                    19-06-05 게시글 댓글기능 구축
                    <br/>
                    19-06-08 댓글 삭제 구축
                </div>
            </section>
                <section className='chat'>
                    <h2>채팅</h2>
                    <div>
                        <br/><br/>
                        19-06-09 채팅 구축
                    </div>
            </section>
        </section>
      );
    }
}

export default Main;