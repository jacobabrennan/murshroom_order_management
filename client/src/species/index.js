

//==============================================================================

//-- Dependencies --------------------------------
import React, { createContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import useGet from '../utilities/use_get.js';
import ViewNew from './new';
import ViewAll from './all';
import ViewEdit from './edit.js';
import Loading from '../components/loading/index.js';
import {
    API_SPECIES_ALL,
    PARAM_ID,
    ROUTE_SPECIES_BASE,
    ROUTE_SPECIES_NEW,
    ROUTE_SPECIES_EDIT,
} from './utilities.js';
import './style.css';

//-- Species Context -----------------------------
const speciesContext = createContext({
    list: [],
    refresh() {},
});
export default speciesContext;

//-- Species Data Provider -----------------------
export function SpeciesData({ children }) {
    const response = useGet(API_SPECIES_ALL);
    let speciesData = {
        list: [],
        refresh() {},
    };
    if(response.data) {
        speciesData = {
            list: response.data.speciesAll,
            refresh: response.refetch,
        }
    }
    //
    if(response.loading) {
        return (<Loading />);
    }
    //
    return (<speciesContext.Provider
        value={speciesData}
        children={children}
    />);
}

//-- Species Router ------------------------------
export function ViewSpecies() {
    return (
        <Switch>
            <Route path={ROUTE_SPECIES_NEW} exact>
                <ViewNew />
            </Route>
            <Route path={`${ROUTE_SPECIES_EDIT}/:${PARAM_ID}`} exit>
                <ViewEdit />
            </Route>
            <Route path={ROUTE_SPECIES_BASE} exact>
                <ViewAll />
            </Route>
            <Route>
                <Redirect to={ROUTE_SPECIES_BASE} />
            </Route>
        </Switch>
    );
}
