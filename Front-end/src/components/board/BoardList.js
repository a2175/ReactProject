import React, { Component } from 'react';
import { isset, getParam, gfn_renderPaging, _movePage } from 'lib';

class BoardList extends Component {
  constructor(props){
    super(props);
    this.state = {
      list: null,
      listNum: null
    };

    this.param = getParam();
  }

  componentDidMount() {
    if(this.param.keyword === null){
      fetch('/api/board/page/'+this.param.page_num, {  
        method: "POST"
        }).then(res => res.json())
          .then(data => this.setState({ list: data.list, listNum: data.listNum }))
    }
    else{
      fetch('/api/board/search/'+this.param.page_num+"/"+this.param.keyword, {  
        method: "POST"
        }).then(res => res.json())
          .then(data => this.setState({ list: data.list, listNum: data.listNum }))
    }
  }

  componentWillUpdate(nextProps, nextState) {
    var params = {
      divId : "PAGE_NAVI",
      pageIndex : this.param.page_num,
      totalCount : nextState.listNum,
      eventName : isset(this.param.keyword) ? '/'+this.param.page_type+'/search/' : '/'+this.param.page_type+'/page/',
      keyword : this.param.keyword
    };
    console.log(params);

    this.page = gfn_renderPaging(params);
    // console.log(this.state.page);
  }

  onClick = e => {
    e.preventDefault();
    var keyword = document.getElementById("keyword").value;
    window.location.href = "/board/search/1/"+keyword;
  }

  render(){
    var lists = [];
    var data = this.state.list;

    for(var key in data) {
        lists.push(<tr key={data[key].idx}>
                    <td>{data[key].idx}</td>
                    <td className="al_l"><a href={"/board/view/"+data[key].idx}>{data[key].subject}{data[key].commentNum > 0 ? " ["+data[key].commentNum+"]" : ""}</a></td>
                    <td>{data[key].name}</td>
                    <td>{data[key].date.replace('T', ' ').substr(0, 19)}</td>
                  </tr>
        );
    };

    return (
      <div className="board_list auto-center">
        <h3>총 게시물 수 : {this.state.listNum}</h3>
        <table width="100%">
            <colgroup>
              <col width="10%"/>
              <col width="60%"/>
              <col width="15%"/>
              <col width="15%"/>
            </colgroup>
            <thead>
              <tr>
                <th>번호</th>
                <th>제목</th>
                <th>작성자</th>
                <th>작성일</th>
              </tr>
            </thead>
            <tbody>
              {lists}
            </tbody>
        </table>
        <div className="btn_group">
            제목 검색: <input type="text" id="keyword" name="keyword" defaultValue={this.param.keyword}/>
            <a href="#this" className="btn-submit" id="search" onClick={this.onClick}>검색</a>
            <a className="btn-default" href="/board/write">작성</a>
        </div>
        <div id="PAGE_NAVI">
          {this.page}
        </div>
      </div>
    );
  }
}

export default BoardList;