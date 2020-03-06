

//== Database Configuration and Export =========================================

//-- Dependencies --------------------------------
import knex from 'knex';

//-- Project Constants ---------------------------
const CONFIG = {
    "client": "sqlite3",
    "useNullAsDefault": true,
    "connection": {
        "filename": "./dev.sqlite3"
    },
    "migrations": {
        "directory": "./migrations"
    },
    "seeds": {
        "directory": "./seeds"
    }
}

//------------------------------------------------
export default knex(CONFIG);
