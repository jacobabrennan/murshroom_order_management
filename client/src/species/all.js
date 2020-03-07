

//==============================================================================

//-- Dependencies --------------------------------
import React, { useContext } from 'react';
import speciesContext from './index.js';

//-- Project Constants ---------------------------

//------------------------------------------------
export default function ViewAll() {
    let speciesList = useContext(speciesContext);
    return (
        <div>
            {speciesList.map(species => (
                <div key={species.code}>{species.species}/{species.substrateFormat}</div>
            ))}
        </div>
    );
}
