import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { gfn_renderPaging } from 'resources/js/common';

class BoardList extends Component {
  constructor(props){
    super(props);
    this.state = {
      list: {},
      listNum: null
    };

    this.params = {
      page_num : this.props.match.params.page_num,
      keyword : this.props.match.params.keyword
    }
  }

  componentDidMount() {
    if(typeof(this.params.keyword) === 'undefined'){
      fetch(`/api/board/pages/${this.params.page_num}`).then(res => res.json())
        .then(data => this.setState({ list: data.list, listNum: data.listNum }))
    }
    else{
      fetch(`/api/board/pages/${this.params.page_num}/${this.params.keyword}`).then(res => res.json())
        .then(data => this.setState({ list: data.list, listNum: data.listNum }))
    }
  }

  doSearch = e => {
    e.preventDefault();
    this.params.keyword = this.keywordInput.value;
    this.props.history.push(`/board/pages/1/${this.params.keyword}`);
    if(this.params.page_num !== '1'){
      fetch(`/api/board/pages/1/${this.params.keyword}`).then(res => res.json())
        .then(data => this.setState({ list: data.list, listNum: data.listNum }))
    }
    this.params.page_num = '1';
  }

  getPostList() {
    var list = [];
    var data = this.state.list;

    for(var key in data) {
        list.push(
          <tr key={data[key].idx}>
            <td>{data[key].idx}</td>
            <td className="al_l"><Link to={"/board/posts/"+data[key].idx}>{data[key].subject}{data[key].commentNum > 0 ? " ["+data[key].commentNum+"]" : ""}</Link></td>
            <td>{data[key].name}</td>
            <td>{data[key].date.replace('T', ' ').substr(0, 19)}</td>
          </tr>
        );
    };

    return list;
  }

  movePage = e => {
    e.preventDefault();
    this.params.page_num = e.target.getAttribute('page');

    if(typeof(this.params.keyword) === 'undefined'){
      this.props.history.push(`/board/pages/${this.params.page_num}`);
      fetch(`/api/board/pages/${this.params.page_num}`).then(res => res.json())
        .then(data => this.setState({ list: data.list, listNum: data.listNum }))
    }
    else{
      this.props.history.push(`/board/pages/${this.params.page_num}/${this.params.keyword}`);
      fetch(`/api/board/pages/${this.params.page_num}/${this.params.keyword}`).then(res => res.json())
        .then(data => this.setState({ list: data.list, listNum: data.listNum }))
    }
  }

  renderPaging() {
    var params = {
      pageIndex : this.params.page_num,
      totalCount : this.state.listNum,
      moveEvent : this.movePage
    };

    return gfn_renderPaging(params);
  }

  render(){
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
              {this.getPostList()}
            </tbody>
        </table>
        <div className="btn_group">
            제목 검색: <input type="text" ref={(ref) => {this.keywordInput = ref}} name="keyword" defaultValue={this.params.keyword}/>
            <Link id="search" className="btn-submit" to="" onClick={this.doSearch}>검색</Link>
            <Link className="btn-default" to="/board/posts/write">작성</Link>
        </div>
        <div id="PAGE_NAVI">
          {this.renderPaging()}
        </div>
      </div>
    );
  }
}

export default BoardList;
