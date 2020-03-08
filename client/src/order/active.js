

//==============================================================================

//-- Dependencies --------------------------------
import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/loading/index.js';
import useGet from '../utilities/use_get.js';

//-- Project Constants ---------------------------
const URL_ORDER_ACTIVE = '/data/order/active';
const URL_ORDER_SINGLE = '/order';
const URL_ORDER_NEW = '/order/new';

//------------------------------------------------
export default function ViewActive() {
    let response = useGet(URL_ORDER_ACTIVE);
    //
    if(response.loading) {
        return (<Loading />);
    }
    //
    return (
        <div>
            <Link className="button" to={URL_ORDER_NEW} children="+ Order" />
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
    const orderUrl = `${URL_ORDER_SINGLE}/${order.id}`;
    return (
        <Link to={orderUrl}>
            asdf
        </Link>
    );
}