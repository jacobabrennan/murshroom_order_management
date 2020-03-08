

//==============================================================================

//-- Dependencies --------------------------------
import React, { useContext } from 'react';
import speciesContext from './index.js';
import { Link, useHistory } from 'react-router-dom';

//-- Project Constants ---------------------------
const URL_SPECIES_NEW = '/species/new';
const URL_SPECIES_EDIT = '/species/edit';

//------------------------------------------------
export default function ViewAll() {
    let { list } = useContext(speciesContext);
    return (
        <React.Fragment>
            <h1 className="action-attach">
                <span className="action-attach__text">Species Management</span>
                <Link className="button" to={URL_SPECIES_NEW} children="+ Species" />
            </h1>
            <table className="species-list">
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Species</th>
                        <th>Strain</th>
                        <th>Substrate Format (lb)</th>
                        <th>Block Amount</th>
                        <th>Incubation Time (weeks)</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map(
                        species => <Species key={species.code} species={species} />
                    )}
                </tbody>
            </table>
        </React.Fragment>
    );
}

//------------------------------------------------
function Species({species}) {
    const history = useHistory();
    function handleClick(clickEvent) {
        history.push(`${URL_SPECIES_EDIT}/${species.id}`);
    }
    return (
        <tr className="species-list__species" onClick={handleClick}>
            <td>{species.code}</td>
            <td>{species.species}</td>
            <td>{species.strain}</td>
            <td>{species.substrateFormat}</td>
            <td>{species.amount}</td>
            <td>{species.incubationTime}</td>
        </tr>
    );
}
