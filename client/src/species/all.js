

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
        <div>
            {list.map(species => (
                <Link
                    to={`/species/edit/${species.id}`}
                    key={species.code}
                >
                    {species.species}/{species.substrateFormat}
                </Link>
            ))}
        </div>
    );
}
