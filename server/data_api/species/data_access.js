

//== Species Data Access =======================================================

//-- Dependencies --------------------------------
import database from '../../database/index.js';
import {
    TABLE_SPECIES,
} from '../utilities.js';


//==============================================================================

//------------------------------------------------
export async function speciesList() {
    return database(TABLE_SPECIES)
        .select('*');
}

//------------------------------------------------
export async function speciesCreate(speciesData) {
    return database(TABLE_SPECIES)
        .insert(speciesData);
}

//------------------------------------------------
export async function speciesEdit(speciesId, speciesData) {
    return database(TABLE_SPECIES)
        .where({id: speciesId})
        .update(speciesData);
}
