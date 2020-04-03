

//==============================================================================

//-- Dependencies --------------------------------
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Loading from '../components/loading/index.js';
import useGet from '../utilities/use_get.js';
import {
    ROUTE_ORDER_NEW,
    API_ORDER_ACTIVE,
    MAKEURL_ROUTE_ORDER_SINGLE,
} from './utilities.js';

//------------------------------------------------
export default function ViewActive() {
    let response = useGet(API_ORDER_ACTIVE);
    //
    if(response.loading) {
        return (<Loading />);
    }
    //
    const orderedOrders = response.data.sort(
        (order1, order2) => order1.shipDate > order2.shipDate
    );
    //
    return (
        <div>
            <h1 className="action-attach">
                <span className="action-attach__text">Order Management</span>
                <Link className="button" to={ROUTE_ORDER_NEW} children="+ Order" />
            </h1>
            <table className="active-orders">
                <thead>
                    <tr>
                        <th>customerName</th>
                        <th>created</th>
                        <th>status</th>
                        <th>shipDate</th>
                    </tr>
                </thead>
                <tbody>
                    {orderedOrders.map(
                        order => <Order key={order.id} order={order} />
                    )}
                </tbody>
            </table>
        </div>
    );
}

//------------------------------------------------
function Order({order}) {
    const history = useHistory();
    function handleClick() {
        const orderUrl = MAKEURL_ROUTE_ORDER_SINGLE(order.id);
        history.push(orderUrl);
    }
    return (
        <tr className="active-orders__order" onClick={handleClick}>
            <td>{order.customerName}</td>
            <td>{order.created}</td>
            <td>{order.status}</td>
            <td>{order.shipDate}</td>
        </tr>
    );
}
