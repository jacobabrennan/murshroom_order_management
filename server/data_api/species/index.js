

//==============================================================================

//-- Dependencies --------------------------------
import express from 'express';
import {
    speciesList,
    speciesCreate,
    speciesEdit,
} from './data_access.js';
import {
    URL_SPECIES_LIST,
    URL_SPECIES_NEW,
    URL_SPECIES_SINGLE,
    PARAM_ID,
} from '../utilities.js';

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

//------------------------------------------------
router.post(URL_SPECIES_SINGLE, async function (request, response, next) {
    const speciesId = parseInt(request.params[PARAM_ID]);
    await speciesEdit(speciesId, request.body);
    response.json({id: speciesId});
});
