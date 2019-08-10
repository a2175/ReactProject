import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import BoardList from "components/board/BoardList"
import BoardDetail from "components/board/BoardDetail"
import BoardWrite from "components/board/BoardWrite"
import BoardUpdate from "components/board/BoardUpdate"
import BoardDelete from "components/board/BoardDelete"

class Board extends Component {
    render(){
      return (
        <div className="Board">
            <Route exact path="/board" component={BoardList}/>
            <Route path="/board/page" component={BoardList}/>
            <Route path="/board/search" component={BoardList}/>
            <Route path="/board/view" component={BoardDetail}/>
            <Route path="/board/write" component={BoardWrite}/>
            <Route path="/board/update" component={BoardUpdate}/>
            <Route path="/board/delete" component={BoardDelete}/>
        </div>
      );
    }
}

export default Board;