

//==============================================================================

//-- Dependencies --------------------------------
import express from 'express';
import {
    ordersActive,
} from './data_access.js';

//-- Project Constants ---------------------------
const URL_ORDER_ACTIVE = '/active';

//-- Export Router -------------------------------
const router = express.Router();
export default router;


//== Route Handlers ============================================================

//------------------------------------------------
router.get(URL_ORDER_ACTIVE, async function (request, response, next) {
    const orders = await ordersActive();
    response.json(orders);
});
