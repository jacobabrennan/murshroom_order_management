

//==============================================================================

//-- Dependencies --------------------------------
import React, { useContext } from 'react';
import speciesContext from './index.js';
import { Link } from 'react-router-dom';

//-- Project Constants ---------------------------

//------------------------------------------------
export default function ViewAll() {
    let { list } = useContext(speciesContext);
    return (
        <React.Fragment>
            <Link className="button" to="/species/new" children="+ Species" />
            <div className="species-list">
                {list.map(
                    species => <Species key={species.code} species={species} />
                )}
            </div>
        </React.Fragment>
    );
}

//------------------------------------------------
function Species({species}) {
    return (
        <Link to={`/species/edit/${species.id}`}>
            {species.code}
            <br />
            {species.species}
            <br />
            {species.strain}
            <br />
            {species.substrateFormat}
            <br />
            {species.amount}
            <br />
            {species.incubationTime}
            <br />
            <br />
        </Link>
    );
}
