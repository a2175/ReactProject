import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header id="header">
      <div>
        <div id="logo">
          <h3><Link to="/">React + Node.js HOMPAGE</Link></h3>
        </div>
      </div>
      <nav id="gnb">
        <ul>
          <li><Link to="/board/pages/1">게시판</Link></li>
          <li><Link to="/chat">채팅</Link></li>
        </ul>
      </nav>
      <form id="commonForm" name="commonForm"></form>
    </header>
  );
};

export default Header;
