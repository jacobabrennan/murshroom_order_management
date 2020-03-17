

//==============================================================================

//-- Dependencies --------------------------------
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
// import { Authenticate } from './authentication/index.js';
import Client from './layout/index.js';
import './styles/reset.css';
import './styles/variables.css';
import './styles/main.css';
import './styles/action_attach.css';
import './styles/big_form.css';
import './styles/button_bar.css';
import './styles/button.css';
import './styles/input_bar.css';

//------------------------------------------------
ReactDOM.render(
    <BrowserRouter>
        {/* <Authenticate> */}
            <Client />
        {/* </Authenticate> */}
    </BrowserRouter>,
    document.getElementById('root'),
);
