

//==============================================================================

//-- Dependencies --------------------------------
import express from 'express';
import {
    ordersActive,
    createOrder,
    getOrder,
    updateOrder,
} from './data_access.js';
import {
    PARAM_ID,
    URL_ORDER_ACTIVE,
    URL_ORDER_NEW,
    URL_ORDER_SINGLE,
} from '../utilities.js';

//-- Export Router -------------------------------
const router = express.Router();
export default router;


//== Route Handlers ============================================================

//------------------------------------------------
router.get(URL_ORDER_ACTIVE, async function (request, response, next) {
    const orders = await ordersActive();
    response.json(orders);
});

//------------------------------------------------
router.get(URL_ORDER_SINGLE, async function (request, response, next) {
    const orderId = parseInt(request.params[PARAM_ID]);
    const order = await getOrder(orderId);
    response.json(order);
});

//------------------------------------------------
router.post(URL_ORDER_NEW, async function (request, response, next) {
    const newOrder = request.body;
    const result = await createOrder(newOrder);
    response.json(result)
});

//------------------------------------------------
router.post(URL_ORDER_SINGLE, async function (request, response, next) {
    const orderId = parseInt(request.params[PARAM_ID]);
    const result = await updateOrder(orderId, request.body);
    response.json(result)
});
