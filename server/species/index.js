

//==============================================================================

//-- Dependencies --------------------------------
import express from 'express';
import {
    speciesList, speciesCreate,
} from './data_access.js';

//-- Project Constants ---------------------------
const URL_SPECIES_LIST = '/all';
const URL_SPECIES_NEW = '/';

//-- Export Router -------------------------------
const router = express.Router();
export default router;


//== Route Handlers ============================================================

//------------------------------------------------
router.get(URL_SPECIES_LIST, async function (request, response, next) {
    let speciesAll = await speciesList();
    response.json({
        speciesAll: speciesAll
    });
});

//------------------------------------------------
router.post(URL_SPECIES_NEW, async function (request, response, next) {
    await speciesCreate(request.body);
    response.json(request.body);
});
