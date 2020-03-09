

//==============================================================================

//-- Dependencies --------------------------------
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ViewActive from './active.js';
import ViewNew from './new.js';
import { ROUTE_ORDER_BASE, ROUTE_ORDER_NEW } from './utilities.js';
import './order.css';

//-- Project Constants ---------------------------

//------------------------------------------------
export default function ViewOrder() {
    return (
        <Switch>
            <Route path={ROUTE_ORDER_BASE} exact>
                <ViewActive />
            </Route>
            <Route path={ROUTE_ORDER_NEW} exact>
                <ViewNew />
            </Route>
        </Switch>
    );
}
