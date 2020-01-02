import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import { BoardList, BoardDetail, BoardWrite, BoardUpdate, BoardDelete } from "components/board"

class Board extends Component {
    render(){
      var url = this.props.match.url
      return (
        <div className="Board">
            <Route exact path={url+"/pages/:page_num"} component={BoardList}/>
            <Route path={url+"/pages/:page_num/:keyword"} component={BoardList}/>
            <Route exact path={url+"/posts/:idx(\\d+)"} component={BoardDetail}/>
            <Route path={url+"/posts/write"} component={BoardWrite}/>
            <Route path={url+"/posts/:idx/edit"} component={BoardUpdate}/>
            <Route path={url+"/posts/:idx/delete"} component={BoardDelete}/>
        </div>
      );
    }
}

export default Board;
