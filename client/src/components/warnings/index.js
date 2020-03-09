

//==============================================================================

//-- Dependencies --------------------------------
import React from 'react';
import './warnings.css';

//------------------------------------------------
export default function Warnings({warnings}) {
    if(!warnings.length) { return '';}
    return (
        <div className="warnings">
            The action could not be completed:
            <ul>
                {warnings.map(
                    (warning, index) => <Warning key={index} warning={warning} />
                )}
            </ul>
        </div>
    );
}

//------------------------------------------------
function Warning({warning}) {
    return (
        <li className="warnings__warning">
            {warning}
        </li>
    );
}
