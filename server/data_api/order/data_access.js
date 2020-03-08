

//== Species Data Access =======================================================

//-- Dependencies --------------------------------
import database from '../../database/index.js';

//-- Project Constants ---------------------------
const TABLE_ORDER = 'order';
const FIELD_STATUS = 'status';
const ORDER_STATUS_OPEN = 0;
const ORDER_STATUS_SPAWNED = 1;
const ORDER_STATUS_SHIPPED = 2;
const ORDER_STATUS_PAID = 3;


//==============================================================================

//------------------------------------------------
export async function ordersActive() {
    return database(TABLE_ORDER)
        .whereNot(FIELD_STATUS, ORDER_STATUS_SHIPPED)
        .select('*');
}
