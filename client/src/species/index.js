

//==============================================================================

//-- Dependencies --------------------------------
import React, { createContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import useGet from '../utilities/use_get.js';
import ViewNew from './new';
import ViewAll from './all';
import './style.css';
import ViewEdit from './edit.js';

//-- Project Constants ---------------------------
const URL_SPECIES_ALL = '/data/species/all';

//-- Species Context -----------------------------
const speciesContext = createContext({
    list: [],
    refresh() {},
});
export default speciesContext;

//-- Species Data Provider -----------------------
export function SpeciesData({ children }) {
    const response = useGet(URL_SPECIES_ALL);
    let speciesData = {
        list: [],
        refresh() {},
    };
    if(response.data) {
        speciesData = {
            list: response.data.speciesAll,
            refresh: () => {
                console.log('refreshing')
                response.refetch()
            }
        }
    }
    return (<speciesContext.Provider
        value={speciesData}
        children={children}
    />);
}

//-- Species Router ------------------------------
export function ViewSpecies() {
    return (
        <Switch>
            <Route path="/species/new" exact>
                <ViewNew />
            </Route>
            <Route path="/species/edit/:id" exit>
                <ViewEdit />
            </Route>
            <Route path="/species" exact>
                <ViewAll />
            </Route>
            <Route>
                <Redirect to="/" />
            </Route>
        </Switch>
    );
}
