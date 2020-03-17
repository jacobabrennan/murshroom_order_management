

//==============================================================================

//-- Dependencies --------------------------------
import express from 'express';
import { test } from './data_access.js';

//------------------------------------------------
const router = express.Router();
export default router;

//------------------------------------------------
router.use('/:day', async function (request, response, next) {
    const rows = await test(`${request.params.day}`);
    response.json(rows)
});
