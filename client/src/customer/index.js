

//==============================================================================

//-- Dependencies --------------------------------
import React from 'react';
import {
    Switch,
    Route,
} from 'react-router-dom';
import ViewCustomerFinder from './finder.js';
import ViewNew from './new.js';
import ViewEdit from './edit.js';
import ViewSingle from './single.js';
import { PARAM_ID } from '../utilities/urls_params.js';
import {
    ROUTE_CUSTOMER_BASE,
    ROUTE_CUSTOMER_NEW,
    ROUTE_CUSTOMER_EDIT,
    ROUTE_CUSTOMER_SINGLE,
} from '../utilities/urls_routing.js';

//------------------------------------------------
export default function ViewCustomer() {
    return (
        <Switch>
            <Route path={ROUTE_CUSTOMER_BASE} exact>
                <ViewCustomerFinder />
            </Route>
            <Route path={ROUTE_CUSTOMER_NEW}>
                <ViewNew />
            </Route>
            <Route path={`${ROUTE_CUSTOMER_SINGLE}/:${PARAM_ID}`} exact>
                <ViewSingle />
            </Route>
            <Route path={`${ROUTE_CUSTOMER_EDIT}/:${PARAM_ID}`} exact>
                <ViewEdit />
            </Route>
        </Switch>
    )
}
