

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
import {
    ROUTE_CUSTOMER_BASE,
    ROUTE_CUSTOMER_NEW,
    ROUTE_CUSTOMER_EDIT,
    PARAM_ID,
} from './utilities.js';

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
            <Route path={`${ROUTE_CUSTOMER_EDIT}/:${PARAM_ID}`}>
                <ViewEdit />
            </Route>
        </Switch>
    )
}
