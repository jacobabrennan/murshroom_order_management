

//== Project Constants =========================================================

//-- URL Parameters ------------------------------
export { PARAM_ID } from '../utilities/urls_params.js';

//-- API URLs ------------------------------------
export {
    API_SPECIES_NEW,
    API_SPECIES_EDIT,
    API_SPECIES_ALL,
    MAKEURL_API_SPECIES_EDIT,
} from '../utilities/urls_api.js';

//-- Routing URLs, and Parameters ----------------
export {
    ROUTE_SPECIES_BASE,
    ROUTE_SPECIES_NEW,
    ROUTE_SPECIES_EDIT,
    MAKEURL_ROUTE_SPECIES_EDIT,
} from '../utilities/urls_routing.js';

//-- Error Messages ------------------------------
export const INVALID_NO_CODE = 'You must provide a product code.';
export const INVALID_NO_SPECIES = 'You must provide a species.';
export const INVALID_NO_STRAIN = 'You must provide a strain.';
export const INVALID_NO_FORMAT = 'You must provide a substrait format (weight).';
export const INVALID_NO_AMOUNT = 'You must specify the number of blocks per inoculation.';
export const INVALID_NO_TIME = 'You must provide the colonization time.';

//-- Form Validation -----------------------------
export function validateForm(form) {
    const results = {};
    //
    results.data = {
        code: form.elements['code'].value,
        species: form.elements['species'].value,
        strain: form.elements['strain'].value,
        substrateFormat: form.elements['substrate format'].value,
        amount: form.elements['amount'].value,
        incubationTime: form.elements['incubation time'].value,
    }
    //
    const problems = [];
    if(!results.data.code) { problems.push(INVALID_NO_CODE);}
    if(!results.data.species) { problems.push(INVALID_NO_SPECIES);}
    if(!results.data.strain) { problems.push(INVALID_NO_STRAIN);}
    if(!results.data.substrateFormat) { problems.push(INVALID_NO_FORMAT);}
    if(!results.data.amount) { problems.push(INVALID_NO_AMOUNT);}
    if(!results.data.incubationTime) { problems.push(INVALID_NO_TIME);}
    if(problems.length) {
        results.problems = problems;
    }
    //
    return results;
}
