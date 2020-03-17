

//==============================================================================

//-- Dependencies --------------------------------
import express from 'express';
import { getWeekProduction } from './data_access.js';

//------------------------------------------------
const router = express.Router();
export default router;

//------------------------------------------------
router.use('/:week', async function (request, response, next) {
    const rows = await getWeekProduction(`${request.params.week}`);
    response.json(rows);
});
