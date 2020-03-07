

//==============================================================================

//-- Dependencies --------------------------------
import React, { createContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import useGet from '../utilities/use_get.js';
import ViewNew from './new';
import ViewAll from './all';
import './style.css';

//-- Project Constants ---------------------------
const URL_SPECIES_ALL = '/data/species/all';

//-- Species Context -----------------------------
const speciesContext = createContext({
    species: [],
});
export default speciesContext;

//-- Species Data Provider -----------------------
export function SpeciesData({ children }) {
    const response = useGet(URL_SPECIES_ALL);
    let speciesData = [];
    if(response.data) {
        speciesData = response.data.speciesAll;
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
            <Route path="/species" exact>
                <ViewAll />
            </Route>
            <Route>
                <Redirect to="/" />
            </Route>
        </Switch>
    );
}
