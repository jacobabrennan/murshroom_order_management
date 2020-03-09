

//== Order Form ================================================================

//-- Dependencies --------------------------------
import React from 'react';
import OrderForm from './order_form/index.js';
import {
    API_ORDER_NEW,
} from './utilities.js';
//------------------------------------------------
export default function ViewNew() {
    const orderUrl = API_ORDER_NEW;
    return (
        <React.Fragment>
            <h1 className="action-attach">
                <span className="action-attach__text">New Order</span>
            </h1>
            <OrderForm orderUrl={orderUrl} />
        </React.Fragment>
    );
}
