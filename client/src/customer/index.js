

//==============================================================================

//-- Dependencies --------------------------------
import React from 'react';
import {
    Switch,
    Route,
} from 'react-router-dom';
import ViewCustomerFinder from './finder';
import ViewNew from './new';
import ViewEdit from './edit';

//------------------------------------------------
export default function ViewCustomer() {
    return (
        <Switch>
            <Route path="/customer" exact>
                <ViewCustomerFinder />
            </Route>
            <Route path="/customer/new">
                <ViewNew />
            </Route>
            <Route path="/customer/edit/:id">
                <ViewEdit />
            </Route>
        </Switch>
    )
}
