

//== Species Data Access =======================================================

//-- Dependencies --------------------------------
import database from '../../database/index.js';

//------------------------------------------------
const TABLE_CUSTOMER = 'customer';
const FIELD_NAME = 'name';

//------------------------------------------------
export async function customerSearch(query) {
    return database(TABLE_CUSTOMER)
        .where(FIELD_NAME, 'like', `%${query}%`)
        .select('*');
}

//------------------------------------------------
export async function customerGet(customerId) {
    return database(TABLE_CUSTOMER)
        .where({id: customerId})
        .first()
        .select('*');
}

//------------------------------------------------
export async function customerCreate(customerData) {
    return database(TABLE_CUSTOMER)
        .insert(customerData);
}

//------------------------------------------------
export async function customerEdit(customerId, customerData) {
    return database(TABLE_CUSTOMER)
        .where({id: customerId})
        .update(customerData);
}