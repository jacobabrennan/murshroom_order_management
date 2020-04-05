

//== Order Form ================================================================

//-- Dependencies --------------------------------
import React from 'react';
import { useParams } from 'react-router-dom';
import useGet from '../utilities/use_get.js';
import Loading from '../components/loading/index.js';
import OrderForm from './order_form/index.js';
import { PARAM_ID } from '../utilities/urls_params.js';
import { MAKEURL_API_ORDER_SINGLE } from '../utilities/urls_api.js';

//------------------------------------------------
export default function ViewEdit() {
    const id = useParams()[PARAM_ID];
    const orderUrl = MAKEURL_API_ORDER_SINGLE(id);
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
                <span className="action-attach__text">Edit Order: {id}</span>
            </h1>
            <OrderForm
                customer={customer}
                shipDate={response.data.shipDate}
                products={response.data.products}
                orderUrl={orderUrl}
            />
        </React.Fragment>
    );
}
