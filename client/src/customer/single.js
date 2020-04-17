

//==============================================================================

//-- Dependencies --------------------------------
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Loading from '../components/loading/index.js';
import useGet from '../utilities/use_get.js';
import { PARAM_ID } from '../utilities/urls_params.js';
import { MAKEURL_ROUTE_CUSTOMER_EDIT } from '../utilities/urls_routing.js';
import { MAKEURL_API_CUSTOMER_SINGLE } from '../utilities/urls_api.js';

//------------------------------------------------
export default function ViewEdit() {
    const id = useParams()[PARAM_ID];
    const customerUrl = MAKEURL_API_CUSTOMER_SINGLE(id);
    const response = useGet(customerUrl)
    const routeEdit = MAKEURL_ROUTE_CUSTOMER_EDIT(id);
    //
    if(response.loading) {
        return (<Loading />);
    }
    const customer = response.data;
    //
    return (
        <React.Fragment>
            <h1 className="action-attach">
                <span className="action-attach__text">View Customer: {id}</span>
                <Link className="button" to={routeEdit} children="Edit" />
            </h1>
            <div>
                <span>Name</span>
                <span>{customer.name}</span>
            </div>
            <div>
                <span>Location</span>
                <span>{customer.location}</span>
            </div>
        </React.Fragment>
    );
}
