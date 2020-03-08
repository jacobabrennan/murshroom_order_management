

//==============================================================================

//-- Dependencies --------------------------------
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ViewActive from './active.js';
import ViewNew from './new.js';
import './order.css';

//-- Project Constants ---------------------------

//------------------------------------------------
export default function ViewOrder() {
    return (
        <Switch>
            <Route path="/order" exact>
                <ViewActive />
            </Route>
            <Route path="/order/new" exact>
                <ViewNew />
            </Route>
        </Switch>
    );
}
