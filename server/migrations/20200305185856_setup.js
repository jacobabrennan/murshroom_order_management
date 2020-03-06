

//== Basic Database Schema =====================================================

//-- Dependencies --------------------------------
const ORDER_STATUS_OPEN = 0;
const ORDER_STATUS_SPAWNED = 1;
const ORDER_STATUS_SHIPPED = 2;
const ORDER_STATUS_PAID = 3;

//-- Project Constants ---------------------------
//
const TABLE_SPECIES = 'species';
const TABLE_CUSTOMER = 'customer';
const TABLE_ORDER = 'order';
const TABLE_ORDER_ITEM = 'orderItem';
const TABLE_USER = 'user';
//
const FIELD_ID = 'id';
const FIELD_CODE = 'code';
const FIELD_SPECIES = 'species'; // species name / spawn source
const FIELD_SUBSTRATE_FORMAT = 'substrateFormat' // weight of block
const FIELD_AMOUNT = 'amount'; // number of blocks per order count
const FIELD_INCUBATION_TIME = 'incubationTime'; // in days
const FIELD_LOCATION = 'location';
const FIELD_NAME = 'name';
const FIELD_CUSTOMER_ID = 'customerId';
const FIELD_CREATED = 'created'; // the date the order was placed
const FIELD_SHIP_DATE = 'shipDate'; // the date the order must be shipped
const FIELD_STATUS = 'status'; // Order status: open, shipped, paid, etc.
const FIELD_ORDER_ID = 'orderId';
const FIELD_SPECIES_ID = 'speciesId';
const FIELD_QUANTITY = 'quantity';
const FIELD_USERNAME = 'username';
const FIELD_PASSWORD = 'password'; // A HASH!

//-- Generate Tables -----------------------------
exports.up = function(knex) {
    return Promise.all([
        // Species
        knex.schema.createTable(TABLE_SPECIES, table => {
            table.increments(FIELD_ID);
            table.string(FIELD_CODE).notNullable().unique();
            table.string(FIELD_SPECIES).notNullable().unique();
            table.integer(FIELD_SUBSTRATE_FORMAT).notNullable();
            table.integer(FIELD_AMOUNT).notNullable();
            table.integer(FIELD_INCUBATION_TIME).notNullable();
        }),
        // Customer
        knex.schema.createTable(TABLE_CUSTOMER, table => {
            table.increments(FIELD_ID);
            table.string(FIELD_LOCATION);
            table.string(FIELD_NAME).notNullable();
        }),
        // Order
        knex.schema.createTable(TABLE_ORDER, table => {
            table.increments(FIELD_ID);
            table.integer(FIELD_CUSTOMER_ID).notNullable();
            table.foreign(FIELD_CUSTOMER_ID).references(`${TABLE_CUSTOMER}.${FIELD_ID}`);
            table.date(FIELD_CREATED).notNullable();
            table.date(FIELD_SHIP_DATE).notNullable();
            table.integer(FIELD_STATUS).defaultTo(ORDER_STATUS_OPEN);
        }),
        // Order Item
        knex.schema.createTable(TABLE_ORDER_ITEM, table => {
            table.integer(FIELD_ORDER_ID).notNullable();
            table.integer(FIELD_SPECIES_ID).notNullable();
            table.integer(FIELD_QUANTITY).notNullable();
            table.foreign(FIELD_ORDER_ID).references(`${TABLE_ORDER}.${FIELD_ID}`);
            table.foreign(FIELD_SPECIES_ID).references(`${TABLE_ORDER}.${FIELD_ID}`);
        }),
        // User
        knex.schema.createTable(TABLE_USER, table => {
            table.increments(FIELD_ID);
            table.string(FIELD_USERNAME).unique().notNullable();
            table.string(FIELD_PASSWORD).notNullable();
        }),
    ]);
};

//-- Delete Tables -------------------------------
exports.down = function(knex) {
    return Promise.all([
        knex.schema.dropTable(TABLE_SPECIES),
        knex.schema.dropTable(TABLE_CUSTOMER),
        knex.schema.dropTable(TABLE_ORDER),
        knex.schema.dropTable(TABLE_ORDER_ITEM),
        knex.schema.dropTable(TABLE_USER), 
    ]);
};
