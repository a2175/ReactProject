import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import { Header, Footer } from './components/common';
import { Main, Board, Chat } from './routes';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <Route exact path="/" component={Main}/>
        <Route path="/board" component={Board}/>
        <Route path="/chat" component={Chat}/>
        <Footer/>
      </div>
    );
  }
}

export default App;
