

//== Order Form ================================================================

//-- Dependencies --------------------------------
import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import useGet from '../utilities/use_get.js';
import Loading from '../components/loading/index.js';
import { PARAM_ID } from '../utilities/urls_params.js';
import { MAKEURL_API_ORDER_SINGLE } from '../utilities/urls_api.js';
import speciesContext from '../species/index.js';
import {
    MAKEURL_ROUTE_CUSTOMER_SINGLE,
    MAKEURL_ROUTE_ORDER_EDIT,
} from '../utilities/urls_routing.js';

//------------------------------------------------
export default function ViewSingle() {
    const id = useParams()[PARAM_ID];
    const orderUrl = MAKEURL_API_ORDER_SINGLE(id);
    const routeEdit = MAKEURL_ROUTE_ORDER_EDIT(id);
    const response = useGet(orderUrl);
    //
    if(response.loading) {
        return (<Loading />);
    }
    //
    const customer = {
        id: response.data.customerId,
        name: response.data.customerName,
    }
    //
    return (
        <React.Fragment>
            <h1 className="action-attach">
                <span className="action-attach__text">View Order: {id}</span>
                <Link className="button" to={routeEdit} children="Edit" />
            </h1>
            <div>
                <span>Customer</span>
                <Link to={MAKEURL_ROUTE_CUSTOMER_SINGLE(customer.id)}>
                    {customer.name}
                </Link>
            </div>
            <div>
                <span>Ship Date</span>
                <span>{response.data.shipDate}</span>
            </div>
            <div>{response.data.products.map(productLine => (
                <ProductLine
                    key={productLine.speciesId}
                    speciesId={productLine.speciesId}
                    quantity={productLine.quantity}
                />
            ))}</div>
        </React.Fragment>
    );
}

//------------------------------------------------
function ProductLine({speciesId, quantity}) {
    const speciesData = useContext(speciesContext)
    const species = speciesData.list.find(
        candidate => candidate.id === speciesId
    );
    return (
        <div>
            <span>{species.code}</span>
            <span>{quantity}</span>
        </div>
    );
}
