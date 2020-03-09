

//==============================================================================

//-- Dependencies --------------------------------
import express from 'express';
import {
    customerCreate, customerEdit, customerGet, customerSearch,
} from './data_access.js';

//-- Project Constants ---------------------------
const PARAM_ID = 'id';
const URL_CUSTOMER_NEW = '/';
const URL_CUSTOMER_SINGLE = `/:${PARAM_ID}`;
const URL_CUSTOMER_SEARCH = '/search'

//-- Export Router -------------------------------
const router = express.Router();
export default router;


//== Route Handlers ============================================================

//------------------------------------------------
router.get(URL_CUSTOMER_SEARCH, async function (request, response, next) {
    const query = request.query.query;
    //
    const customerId = parseInt(query);
    if(Number.isInteger(customerId)) {
        const customer = await customerGet(customerId);
        if(!customer) {
            response.json([]);
        }
        else {
            response.json([customer]);
        }
        return;
    }
    //
    const matches = await customerSearch(query);
    response.json(matches);
});

//------------------------------------------------
router.get(URL_CUSTOMER_SINGLE, async function (request, response, next) {
    const customerId = parseInt(request.params[PARAM_CUSTOMER_ID]);
    const customer = await customerGet(customerId);
    response.json(customer);
});

//------------------------------------------------
router.post(URL_CUSTOMER_NEW, async function (request, response, next) {
    await customerCreate(request.body);
    response.json(request.body);
});

//------------------------------------------------
router.post(URL_CUSTOMER_SINGLE, async function (request, response, next) {
    const customerId = parseInt(request.params[PARAM_CUSTOMER_ID]);
    await customerEdit(customerId, request.body);
    response.json({id: customerId});
});
