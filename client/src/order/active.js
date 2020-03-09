

//==============================================================================

//-- Dependencies --------------------------------
import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/loading/index.js';
import useGet from '../utilities/use_get.js';
import {
    ROUTE_ORDER_NEW,
    API_ORDER_ACTIVE,
    ROUTE_ORDER_SINGLE,
} from './utilities.js';

//------------------------------------------------
export default function ViewActive() {
    let response = useGet(API_ORDER_ACTIVE);
    //
    if(response.loading) {
        return (<Loading />);
    }
    //
    return (
        <div>
            <h1 className="action-attach">
                <span className="action-attach__text">Order Management</span>
                <Link className="button" to={ROUTE_ORDER_NEW} children="+ Order" />
            </h1>
            <div>
                {response.data.map(
                    order => <Order key={order.id} order={order} />
                )}
            </div>
        </div>
    );
}

//------------------------------------------------
function Order({order}) {
    const orderUrl = `${ROUTE_ORDER_SINGLE}/${order.id}`;
    return (
        <Link to={orderUrl}>
            asdf
        </Link>
    );
}