

//==============================================================================

//-- Dependencies --------------------------------
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ViewActive from './active.js';
import ViewNew from './new.js';
import ViewEdit from './edit.js';
//import ViewSingle from './edit.js';
import { PARAM_ID } from '../utilities/urls_params.js';
import {
    ROUTE_ORDER_BASE,
    ROUTE_ORDER_NEW,
    ROUTE_ORDER_SINGLE,
    ROUTE_ORDER_EDIT,
} from '../utilities/urls_routing.js';
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
            <Route path={`${ROUTE_ORDER_SINGLE}/:${PARAM_ID}`} exact>
                <ViewEdit />
            </Route>
            <Route path={`${ROUTE_ORDER_EDIT}/:${PARAM_ID}`} exact>
                <ViewEdit />
            </Route>
        </Switch>
    );
}
