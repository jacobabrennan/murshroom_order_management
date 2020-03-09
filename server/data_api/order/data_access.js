

//== Species Data Access =======================================================

//-- Dependencies --------------------------------
import database from '../../database/index.js';

//-- Project Constants ---------------------------
const TABLE_ORDER = 'order';
const TABLE_ORDER_ITEM = 'orderItem';
const TABLE_CUSTOMER = 'customer';
const FIELD_ID = 'id';
const FIELD_CUSTOMER_ID = 'customerId';
const FIELD_CREATED = 'created';
const FIELD_SHIP_DATE = 'shipDate';
const FIELD_STATUS = 'status';
const FIELD_ORDER_ID = 'orderId';
const FIELD_SPECIES_ID = 'speciesId';
const FIELD_QUANTITY = 'quantity';
const FIELD_NAME = 'name';
const ORDER_STATUS_OPEN = 0;
const ORDER_STATUS_SPAWNED = 1;
const ORDER_STATUS_SHIPPED = 2;
const ORDER_STATUS_PAID = 3;


//==============================================================================

//-- Get One -------------------------------------
export async function getOrder(orderId) {
    const order = await database(TABLE_ORDER)
        .where(`${TABLE_ORDER}.${FIELD_ID}`, orderId)
        .first()
        .join(
            TABLE_CUSTOMER,
            `${TABLE_ORDER}.${FIELD_CUSTOMER_ID}`,
            '=',
            `${TABLE_CUSTOMER}.${FIELD_ID}`,
        )
        .select(
            `${TABLE_ORDER}.${FIELD_ID}`,
            `${TABLE_ORDER}.${FIELD_CUSTOMER_ID}`,
            `${TABLE_ORDER}.${FIELD_CREATED}`,
            `${TABLE_ORDER}.${FIELD_SHIP_DATE}`,
            `${TABLE_ORDER}.${FIELD_STATUS}`,
            `${TABLE_CUSTOMER}.${FIELD_NAME} as customerName`,
        );
    const productRows = await database(TABLE_ORDER_ITEM)
        .where(FIELD_ORDER_ID, orderId)
        .select('*');
    order.products = productRows;
    return order;
}

//-- Get All Active ------------------------------
export async function ordersActive() {
    return database(TABLE_ORDER)
        .whereNot(FIELD_STATUS, ORDER_STATUS_SHIPPED)
        .join(
            TABLE_CUSTOMER,
            `${TABLE_ORDER}.${FIELD_CUSTOMER_ID}`,
            '=',
            `${TABLE_CUSTOMER}.${FIELD_ID}`,
        )
        .select(
            `${TABLE_ORDER}.${FIELD_ID}`,
            `${TABLE_ORDER}.${FIELD_CUSTOMER_ID}`,
            `${TABLE_ORDER}.${FIELD_CREATED}`,
            `${TABLE_ORDER}.${FIELD_SHIP_DATE}`,
            `${TABLE_ORDER}.${FIELD_STATUS}`,
            `${TABLE_CUSTOMER}.${FIELD_NAME} as customerName`,
        );
}

//-- Create New ----------------------------------
export async function createOrder(orderData) {
    //
    const now = new Date();
    const dateString = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;
    //
    const recordData = {
        [FIELD_CUSTOMER_ID]: orderData[FIELD_CUSTOMER_ID],
        [FIELD_SHIP_DATE]: orderData[FIELD_SHIP_DATE],
        [FIELD_CREATED]: dateString,
        [FIELD_STATUS]: ORDER_STATUS_OPEN,
    };
    const [orderId] = await database(TABLE_ORDER)
        .insert(recordData);
    //
    if(!orderId) { throw "Can't get orderId"}
    try {
        const productData = orderData.products.map(product => ({
            [FIELD_ORDER_ID]: orderId,
            [FIELD_SPECIES_ID]: product.speciesId,
            [FIELD_QUANTITY]: product.quantity,
        }));
        await database(TABLE_ORDER_ITEM)
            .insert(productData);
    }
    //
    catch(error) {
        await database(TABLE_ORDER)
            .where({[FIELD_ID]: orderId})
            .del();
        throw error;
    }
    //
    return {[FIELD_ID]: orderId};
}

//-- Update One ----------------------------------
export async function updateOrder(orderId, orderData) {
    // Update order record
    const recordData = {
        [FIELD_CUSTOMER_ID]: orderData[FIELD_CUSTOMER_ID],
        [FIELD_SHIP_DATE]: orderData[FIELD_SHIP_DATE],
        [FIELD_CREATED]: orderData[FIELD_CREATED],
        // [FIELD_STATUS]: ORDER_STATUS_OPEN,
    };
    await database(TABLE_ORDER)
        .where(FIELD_ID, orderId)
        .update(recordData);
    // Remove old product records
    await database(TABLE_ORDER_ITEM)
        .where(FIELD_ORDER_ID, orderId)
        .del();
    // Insert new product records
    const productData = orderData.products.map(product => ({
        [FIELD_ORDER_ID]: orderId,
        [FIELD_SPECIES_ID]: product.speciesId,
        [FIELD_QUANTITY]: product.quantity,
    }));
    await database(TABLE_ORDER_ITEM)
        .insert(productData);
    //
    return {[FIELD_ID]: orderId};
}
