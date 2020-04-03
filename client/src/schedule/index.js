

//==============================================================================

//-- Dependencies --------------------------------
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
    weekStart,
    dateToString,
    stringToDate,
    API_SCHEDULE_WEEK,
    ROUTE_ORDER_BASE,
} from './utilities.js';
import useGet from '../utilities/use_get.js';
import Loading from '../components/loading/index.js';
import './schedule.css';

//------------------------------------------------
const CURRENT_DATE = new Date();

//------------------------------------------------
export default function ViewSchedule() {
    //
    const [viewWeek, setViewWeek] = useState(CURRENT_DATE);
    const response = useGet(API_SCHEDULE_WEEK);
    //
    function handleWeekChange(eventChange) {
        const newDate = stringToDate(eventChange.currentTarget.value);
        const monday = weekStart(newDate);
        setViewWeek(monday);
        response.refetch(MAKEURL_API_SCHEDULE_WEEK(dateToString(monday)));
    }
    //
    let contents = null;
    if(response.loading) {
        contents = (<Loading />);
    } else {
        const quantitiesKnock = {};
        const idsByCode = {};
        const formatByCode = {};
        for(const product of response.data.inoculate) {
            const quantityPrevious = quantitiesKnock[product.code] || 0;
            quantitiesKnock[product.code] = quantityPrevious + product.quantity;
            idsByCode[product.code] = product.speciesId;
            formatByCode[product.code] = product.substrateFormat;
        }
        const ordersShip = {};
        for(const product of response.data.ship) {
            const orderKey = `${product.orderId}`;
            let orderPrevious = ordersShip[orderKey];
            if(!orderPrevious) {
                orderPrevious = {
                    id: product.orderId,
                    customerId: product.customerId,
                    customerName: product.name,
                    shipDate: product.shipDate,
                    products: [],
                };
                ordersShip[orderKey] = orderPrevious;
            }
            orderPrevious.products.push(product);
        }
        contents = (
            <React.Fragment>
                <fieldset className="week week-knock">
                    <legend>Blocks to be Inoculated</legend>
                    <table className="schedule__table">
                        <thead>
                            <tr>
                                <th>Product Code</th>
                                <th>Quantity (Blocks)</th>
                                <th>Format (lbs)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(quantitiesKnock).map(speciesCode => (
                                <LineKnock
                                    key={speciesCode}
                                    code={speciesCode}
                                    quantity={quantitiesKnock[speciesCode]}
                                    speciesId={idsByCode[speciesCode]}
                                    format={formatByCode[speciesCode]}
                                />
                            ))}
                        </tbody>
                    </table>
                </fieldset>
                <fieldset className="week week-ship">
                    <legend>Orders to be Shipped</legend>
                    <OrdersTable orders={ordersShip} />
                </fieldset>
            </React.Fragment>
        );
    }
    //
    return (
        <div className="big-form">
            <h1 className="action-attach">
                <span className="action-attach__text">
                    Schedule: Week of {weekName(viewWeek)}
                </span>
            </h1>
            <fieldset>
                <legend>View Week</legend>
                <input
                    type="date"
                    value={dateToString(viewWeek)}
                    onChange={handleWeekChange}
                />
            </fieldset>
            {contents}
        </div>
    );
}

//------------------------------------------------
function weekName(theDate) {
    const monday = weekStart(theDate);
    const monthName = [
        'Jan', 'Feb', 'Mar',
        'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep',
        'Oct', 'Nov', 'Dec',
    ][monday.getMonth()];
    const dateNumber = monday.getDate();
    let ordinal = 'th';
    if (dateNumber <= 3 || dateNumber >= 21) {
        switch (dateNumber % 10) {
            case 1:  { ordinal = 'st'; break;}
            case 2:  { ordinal = 'nd'; break;}
            case 3:  { ordinal = 'rd'; break;}
            default: { ordinal = 'th'; break;}
        }
    }
    return `Monday, ${monthName} ${dateNumber}${ordinal}`
}

//------------------------------------------------
function LineKnock({code, quantity, speciesId, format}) {
    return (
        <tr>
            <td>{code}</td>
            <td>{quantity}</td>
            <td>{format}</td>
        </tr>
    )
}
function OrdersTable({orders}) {
    return (
        <table className="schedule__table schedule__orders">
            <thead>
                <tr>
                    <th>Customer</th>
                    <th>Product Code</th>
                    <th>Quantity (Blocks)</th>
                </tr>
            </thead>
            {Object.keys(orders).map(orderId => (
                <OrderSingle key={orderId} order={orders[orderId]} />
            ))}
        </table>
    );
}
function OrderSingle({order}) {
    const history = useHistory();
    const orderUrl = `${ROUTE_ORDER_BASE}/${order.id}`;
    const customerField = (
        <th scope="row" rowSpan={order.products.length}>
            {order.customerName}
        </th>
    );
    function handleClick() {
        history.push(orderUrl);
    }
    return (
        <tbody onClick={handleClick}>
            {order.products.map((product, index) => (
                <LineProduct
                    customer={(index === 0)? customerField : null}
                    key={index}
                    product={product}
                />
            ))}
        </tbody>
    );
}
function LineProduct({product, customer}) {
    return (
        <tr>
            {customer}
            <td>{product.code}</td>
            <td>{product.quantity}</td>
        </tr>
    );
}
