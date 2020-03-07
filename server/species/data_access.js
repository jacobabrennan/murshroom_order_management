

//== Species Data Access =======================================================

//-- Dependencies --------------------------------
import database from '../database/index.js';

//------------------------------------------------
const TABLE_SPECIES = 'species';

//-- Project Constants ---------------------------

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
