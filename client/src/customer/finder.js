

//==============================================================================

//-- Dependencies --------------------------------
import React, { useRef, useState } from 'react';
import {
    Link,
} from 'react-router-dom';

//-- Project Constants ---------------------------
const URL_CUSTOMER_SEARCH = '/data/customer/search';

//------------------------------------------------
export default function ViewCustomerFinder() {
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
        <React.Fragment>
            <form ref={formRef} onSubmit={handleSubmit}>
                <Link className="button" to="/customer/new" children="+ Customer" />
                <label>
                    <span>Customer Number or Name</span>
                    <input name="query" type="text" />
                    <button className="button small" type="submit" children="Find" />
                </label>
            </form>
            <div>
                {searchResults.map(
                    customer => <Customer key={customer.id} customer={customer} />
                )}
            </div>
        </React.Fragment>
    );
}

//------------------------------------------------
function Customer({customer}) {
    const customerUrl = `/customer/edit/${customer.id}`;
    return (
        <Link to={customerUrl}>
            {customer.name}
            <br />
            {customer.location}
            <br />
            <br />
        </Link>
    );
}