

//==============================================================================

//-- Dependencies --------------------------------
import React, { useRef, useState } from 'react';
import './customer_finder.css';

//-- Project Constants ---------------------------
const URL_CUSTOMER_SEARCH = '/data/customer/search';

//------------------------------------------------
export default function CustomerFinder({onSelect}) {
    let formRef = useRef();
    let [searchResults, setSearchResults] = useState([]);
    //
    async function handleSubmit(eventSubmit) {
        //
        eventSubmit.preventDefault();
        const recordForm = formRef.current;
        for(const element of recordForm.elements) {
            element.disabled = true;
        }
        //
        const query = recordForm.elements['query'].value;
        const fetchUrl = `${URL_CUSTOMER_SEARCH}?query=${query}`;
        //
        const response = await fetch(fetchUrl);
        const data = await response.json();
        setSearchResults(data);
        //
        recordForm.reset();
        for(const element of recordForm.elements) {
            element.disabled = false;
        }
    }
    //
    return (
        <div className="customer-finder">
            <form ref={formRef} onSubmit={handleSubmit}>
                <label>
                    <div className="customer-finder__prompt">Customer Number or Name</div>
                    <div className="input-bar">
                        <input name="query" type="text" />
                        <button className="button" type="submit" children="Find" />
                    </div>
                </label>
            </form>
            <div>
                {searchResults.map(customer =>
                    <Customer
                        key={customer.id}
                        customer={customer}
                        onClick={onSelect}
                    />
                )}
            </div>
        </div>
    );
}

//------------------------------------------------
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