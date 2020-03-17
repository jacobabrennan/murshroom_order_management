

//== Database Configuration and Export =========================================

//-- Dependencies --------------------------------
import knex from 'knex';
import { USERNAME, PASSWORD } from '../secure/database.js';

//-- Project Constants ---------------------------
const DATABASE_HOST = 'localhost';
const DATABASE_NAME = 'orders';

//-- Configure database --------------------------
const config = {
    "client": "pg",
    "useNullAsDefault": true,
    "connection": {
        "host": DATABASE_HOST,
        "user": USERNAME,
        "password": PASSWORD,
        "database": DATABASE_NAME,
        "charset": "utf8"
    },
    "migrations": {
        "directory": "./database/migrations"
    },
    "seeds": {
        "directory": "./database/seeds"
    }
}
// const CONFIG = {
//     "client": "sqlite3",
//     "useNullAsDefault": true,
//     "connection": {
//         "filename": "./database/dev.sqlite3"
//     },
//     "migrations": {
//         "directory": "./database/migrations"
//     },
//     "seeds": {
//         "directory": "./database/seeds"
//     }
// }
export default knex(config);
