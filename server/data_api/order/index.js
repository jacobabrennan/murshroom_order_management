

//==============================================================================

//-- Dependencies --------------------------------
import express from 'express';
import {
    ordersActive,
    createOrder,
    getOrder,
    updateOrder,
} from './data_access.js';

//-- Project Constants ---------------------------
const PARAM_ID = 'id';
const URL_ORDER_ACTIVE = '/active';
const URL_ORDER_NEW = '/';
const URL_ORDER_SINGLE = `/:${PARAM_ID}`;

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
    await createOrder(newOrder);
    response.json({})
});

//------------------------------------------------
router.post(URL_ORDER_SINGLE, async function (request, response, next) {
    const orderId = parseInt(request.params[PARAM_ID]);
    await updateOrder(orderId, request.body);
    response.json({})
});
