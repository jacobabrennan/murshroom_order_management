

//==============================================================================

//-- Dependencies --------------------------------
import React, { useRef, useState } from 'react';

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
                    <span>Customer Number or Name</span>
                    <input name="query" type="text" />
                    <button className="button small" type="submit" children="Find" />
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
            {customer.name}
            <br />
            {customer.location}
            <br />
            <br />
        </div>
    );
}