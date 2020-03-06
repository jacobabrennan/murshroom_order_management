

//== Database Configuration and Export =========================================

//-- Dependencies --------------------------------
import knex from 'knex';

//-- Project Constants ---------------------------
const CONFIG = {
    "client": "sqlite3",
    "useNullAsDefault": true,
    "connection": {
        "filename": "./database/dev.sqlite3"
    },
    "migrations": {
        "directory": "./database/migrations"
    },
    "seeds": {
        "directory": "./database/seeds"
    }
}

//------------------------------------------------
export default knex(CONFIG);
