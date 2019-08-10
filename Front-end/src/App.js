import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Main from "./routes/Main"
import Board from "./routes/Board"
import Chat from "./routes/Chat"

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={Main}/>
        <Route path="/board" component={Board}/>
        <Route path="/chat" component={Chat}/>
      </div>
    );
  }
}

export default App;
