

//==============================================================================

//-- Dependencies --------------------------------
import express from 'express';
import customer from './customer/index.js';
import order from './order/index.js';
import schedule from './schedule/index.js';
import species from './species/index.js';
import {
    URL_CUSTOMER_BASE,
    URL_ORDER_BASE,
    URL_SCHEDULE_BASE,
    URL_SPECIES_BASE,
} from './utilities.js';

//------------------------------------------------
const router = express.Router();
export default router;
router.use(URL_CUSTOMER_BASE, customer);
router.use(URL_ORDER_BASE, order);
router.use(URL_SCHEDULE_BASE, schedule);
router.use(URL_SPECIES_BASE, species);
