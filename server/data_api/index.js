

//==============================================================================

//-- Dependencies --------------------------------
import express from 'express';
import species from './species/index.js';
import customer from './customer/index.js';
import order from './order/index.js';

//-- Project Constants ---------------------------
const URL_SPECIES = '/species';
const URL_CUSTOMER = '/customer';
const URL_ORDER = '/order';

//------------------------------------------------
const router = express.Router();
export default router;
router.use(URL_SPECIES, species);
router.use(URL_CUSTOMER, customer);
router.use(URL_ORDER, order);
