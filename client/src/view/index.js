

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
import './client.css';
import './button.css';

//-- React Component -----------------------------
export default function Client() {
    return (
        <div className="client">
            <HeaderBar />
            <div className="page">
                <SpeciesData>
                    <Switch>
                        <Route path="/auth">
                            <Redirect to="/" />
                        </Route>
                        {/* <Route path="/order/new" exact>
                            <ViewOrderNew />
                        </Route> */}
                        <Route path="/species">
                            <ViewSpecies />
                        </Route>
                        <Route>
                            {/* <ViewNotFound /> */}
                        </Route>
                    </Switch>
                </SpeciesData>
            </div>
        </div>
    );
}
