

//==============================================================================

//-- Dependencies --------------------------------
import express from 'express';
import { getWeekProduction } from './data_access.js';
import { dateToString } from '../utilities.js';

//------------------------------------------------
const router = express.Router();
export default router;

//------------------------------------------------
router.use(async function (request, response, next) {
    let weekQuery = request.query.week;
    if(!weekQuery) {
        weekQuery = dateToString(new Date());
    }
    const rows = await getWeekProduction(weekQuery);
    response.json(rows);
});
