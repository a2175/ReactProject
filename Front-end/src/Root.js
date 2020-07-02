import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './resources/css/common.css';

const Root = () => (
    <BrowserRouter>
        <App/>
    </BrowserRouter>
);

export default Root;
