

//== Test Seeding ==============================================================

//-- Project Constants ---------------------------
//
const ORDER_STATUS_OPEN = 0;
const ORDER_STATUS_SPAWNED = 1;
const ORDER_STATUS_SHIPPED = 2;
const ORDER_STATUS_PAID = 3;
//
const TABLE_SPECIES = 'species';
const TABLE_CUSTOMER = 'customer';
const TABLE_ORDER = 'order';
const TABLE_ORDER_ITEM = 'orderItem';
const TABLE_USER = 'user';
//
const FIELD_ID = 'id';
const FIELD_CODE = 'code';
const FIELD_SPECIES = 'species'; // species name
const FIELD_STRAIN = 'strain'; // Spawn Source
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

//------------------------------------------------
exports.seed = function(knex) {
    return Promise.all([
        knex(TABLE_SPECIES).del(),
        knex(TABLE_CUSTOMER).del(),
        knex(TABLE_ORDER).del(),
        knex(TABLE_ORDER_ITEM).del(),
    ])
    .then(() => knex(TABLE_SPECIES).insert([
        {[FIELD_CODE]: 'PO1', [FIELD_SPECIES]: 'Blue Oyster', [FIELD_STRAIN]: 'CNS (green)', [FIELD_SUBSTRATE_FORMAT]: 10, [FIELD_AMOUNT]: 20, [FIELD_INCUBATION_TIME]: 2},
        {[FIELD_CODE]: 'PO2', [FIELD_SPECIES]: 'Red Oyster', [FIELD_STRAIN]: 'CNS (purple)', [FIELD_SUBSTRATE_FORMAT]: 20, [FIELD_AMOUNT]: 10, [FIELD_INCUBATION_TIME]: 3},
    ]))
    .then(() => knex(TABLE_CUSTOMER).insert([
        {[FIELD_NAME]: "George's Fungus", [FIELD_LOCATION]: 'Sandwhich, Maine'},
        {[FIELD_NAME]: "June's Fun Guys", [FIELD_LOCATION]: 'Kuppasoop, Maine'},
    ]))
    .then(() => knex(TABLE_ORDER).insert([
        {[FIELD_CUSTOMER_ID]: 1, [FIELD_SHIP_DATE]: "2020-04-14", [FIELD_STATUS]: ORDER_STATUS_OPEN, [FIELD_CREATED]: "2020-02-14"},
        {[FIELD_CUSTOMER_ID]: 2, [FIELD_SHIP_DATE]: "2020-04-21", [FIELD_STATUS]: ORDER_STATUS_OPEN, [FIELD_CREATED]: "2020-02-07"},
        {[FIELD_CUSTOMER_ID]: 2, [FIELD_SHIP_DATE]: "2020-04-07", [FIELD_STATUS]: ORDER_STATUS_OPEN, [FIELD_CREATED]: "2020-02-21"},
    ]))
    .then(() => knex(TABLE_ORDER_ITEM).insert([
        {[FIELD_ORDER_ID]: 1, [FIELD_SPECIES_ID]: 1, [FIELD_QUANTITY]: 20},
        {[FIELD_ORDER_ID]: 1, [FIELD_SPECIES_ID]: 2, [FIELD_QUANTITY]: 40},
        {[FIELD_ORDER_ID]: 2, [FIELD_SPECIES_ID]: 1, [FIELD_QUANTITY]: 200},
        {[FIELD_ORDER_ID]: 2, [FIELD_SPECIES_ID]: 2, [FIELD_QUANTITY]: 400},
        {[FIELD_ORDER_ID]: 3, [FIELD_SPECIES_ID]: 2, [FIELD_QUANTITY]: 80},
    ]));
};
