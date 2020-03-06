

//==============================================================================

//-- Dependencies --------------------------------
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Authenticate } from './authentication/index.js';
import Client from './view/index.js';
import './reset.css';
import './main.css';

//------------------------------------------------
ReactDOM.render(
    <BrowserRouter>
        <Authenticate>
            <Client />
        </Authenticate>
    </BrowserRouter>,
    document.getElementById('root'),
);
