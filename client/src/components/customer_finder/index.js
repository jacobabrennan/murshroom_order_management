

//==============================================================================

//-- Dependencies --------------------------------
import React, { useRef } from 'react';
import useGetDelayed from '../../utilities/use_get_delayed.js';
import Loading from '../loading/index.js';
import { MAKEURL_API_CUSTOMER_SEARCH } from '../../utilities/urls_api.js';
import './customer_finder.css';

//-- Main Component ------------------------------
export default function CustomerFinder({onSelect}) {
    const refInput = useRef();
    const refButton = useRef();
    const response = useGetDelayed();
    // Interaction handlers
    async function handleSubmit(eventSubmit) {
        // Prevent page refresh / default form submission behavior
        if(eventSubmit) {
            eventSubmit.preventDefault();
        }
        // Disable controls while loading
        refButton.current.disabled = true;
        refInput.current.disabled = true;
        // Request customer suggestions from server
        const query = refInput.current.value;
        const fetchUrl = MAKEURL_API_CUSTOMER_SEARCH(query);
        await response.fetch(fetchUrl);
        // Re-enable and clear controls and 
        refInput.current.value = null;
        refInput.current.disabled = false;
        refButton.current.disabled = false;
    }
    async function handleKeyUp(eventKeyUp) {
        if(eventKeyUp.key === "Enter") {
            handleSubmit();
        }
    }
    // Prep JSX for results display
    let resultsDisplay = '';
    if(response.loading) { resultsDisplay = (<Loading />);}
    else if(!response.data) { resultsDisplay = '';}
    else if(!response.data.length) {
        resultsDisplay = (<div className="customer-finder__no-results">No customers found.</div>);
    }
    else {
        resultsDisplay = (
            <React.Fragment>
                {response.data.map(customer =>
                    <Customer
                        key={customer.id}
                        customer={customer}
                        onClick={onSelect}
                    />
                )}
            </React.Fragment>
        );
    }
    // Render component
    return (
        <div className="customer-finder">
            <label>
                <div className="customer-finder__prompt">Customer Number or Name</div>
                <div className="input-bar">
                    <input
                        ref={refInput}
                        name="query"
                        type="text"
                        onKeyUp={handleKeyUp}
                    />
                    <button
                        ref={refButton}
                        className="button"
                        children="Find"
                        onClick={handleSubmit}
                    />
                </div>
            </label>
            <div className="customer-finder__results">
                {resultsDisplay}
            </div>
        </div>
    );
}

//-- Customer Sub-component ----------------------
function Customer({customer, onClick}) {
    function handleClick() {
        onClick(customer);
    }
    return (
        <div onClick={handleClick} className="customer-finder__customer">
            <span>{customer.name}</span>
            <span>{customer.location}</span>
        </div>
    );
}