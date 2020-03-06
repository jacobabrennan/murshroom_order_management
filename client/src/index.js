

//==============================================================================

//-- Dependencies --------------------------------
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Authenticate } from './authentication';
import './reset.css';
import './main.css'

//------------------------------------------------
ReactDOM.render(
    <BrowserRouter>
        <Authenticate>
            <React.Fragment />
        </Authenticate>
    </BrowserRouter>,
    document.getElementById('root'),
);
