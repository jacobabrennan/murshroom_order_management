

//==============================================================================

//-- Dependencies --------------------------------
import React from 'react';
import {
    Link, useHistory,
} from 'react-router-dom';
import CustomerFinder from '../components/customer_finder/index.js';

//-- Project Constants ---------------------------
const URL_CUSTOMER_NEW = '/customer/new';
const URL_CUSTOMER_EDIT = '/customer/edit';

//------------------------------------------------
export default function ViewCustomerFinder() {
    const history = useHistory();
    function handleSelect(customer) {
        const customerUrl = `${URL_CUSTOMER_EDIT}/${customer.id}`;
        history.push(customerUrl);
    }
    return (
        <div>
            <h1 className="action-attach">
                <span className="action-attach__text">Customer Management</span>
                <Link className="button" to={URL_CUSTOMER_NEW} children="+ Customer" />
            </h1>
            <CustomerFinder onSelect={handleSelect} />
        </div>
    );
}
