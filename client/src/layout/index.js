

//== Full React Client =========================================================

//-- Dependencies --------------------------------
import React from 'react';
import {
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import HeaderBar from '../components/header_bar/index.js';
// import ViewOrderNew from './order_new.js';
import {
    SpeciesData,
    ViewSpecies,
} from '../species/index.js';
import ViewCustomer from '../customer/index.js';
import ViewOrder from '../order/index.js';
import ViewSchedule from '../schedule/index.js';
import {
    ROUTE_AUTH_BASE,
    ROUTE_ORDER_BASE,
    ROUTE_SPECIES_BASE,
    ROUTE_CUSTOMER_BASE,
    ROUTE_SCHEDULE_BASE,
} from '../utilities/urls_routing.js';
import './layout.css';

//-- React Component -----------------------------
export default function Client() {
    return (
        <div className="client">
            <HeaderBar />
            <div className="page">
                <SpeciesData>
                    <Switch>
                        <Route path={ROUTE_AUTH_BASE}>
                            <Redirect to="/" />
                        </Route>
                        <Route path={ROUTE_ORDER_BASE}>
                            <ViewOrder />
                        </Route>
                        <Route path={ROUTE_SPECIES_BASE}>
                            <ViewSpecies />
                        </Route>
                        <Route path={ROUTE_CUSTOMER_BASE}>
                            <ViewCustomer />
                        </Route>
                        <Route path={ROUTE_SCHEDULE_BASE}>
                            <ViewSchedule />
                        </Route>
                    </Switch>
                </SpeciesData>
            </div>
        </div>
    );
}
