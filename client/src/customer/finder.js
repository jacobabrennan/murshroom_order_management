

//==============================================================================

//-- Dependencies --------------------------------
import React from 'react';
import {
    Link, useHistory,
} from 'react-router-dom';
import CustomerFinder from '../components/customer_finder/index.js';

//-- Project Constants ---------------------------
const URL_CUSTOMER_NEW = '/data/customer/new';
const URL_CUSTOMER_EDIT = '/customer/edit';

//------------------------------------------------
export default function ViewCustomerFinder() {
    const history = useHistory();
    function handleSelect(customer) {
        const customerUrl = `${URL_CUSTOMER_EDIT}/${customer.id}`;
        history.push(customerUrl);
    }
    return (
        <React.Fragment>
            <Link className="button" to={URL_CUSTOMER_NEW} children="+ Customer" />
            <CustomerFinder onSelect={handleSelect} />
        </React.Fragment>
    );
}
