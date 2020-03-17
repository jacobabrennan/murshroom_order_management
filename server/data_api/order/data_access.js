

//== Species Data Access =======================================================

//-- Dependencies --------------------------------
import database from '../../database/index.js';
import {
    field,
    dateString,
    TABLE_ORDER,
    TABLE_ORDER_ITEM,
    TABLE_CUSTOMER,
    FIELD_ID,
    FIELD_CUSTOMER_ID,
    FIELD_CREATED,
    FIELD_SHIP_DATE,
    FIELD_STATUS,
    FIELD_ORDER_ID,
    FIELD_SPECIES_ID,
    FIELD_QUANTITY,
    FIELD_NAME,
    ORDER_STATUS_OPEN,
    ORDER_STATUS_SPAWNED,
    ORDER_STATUS_SHIPPED,
    ORDER_STATUS_PAID,
} from '../utilities.js';
dateString
//-- Project Constants ---------------------------
const FIELD_CUSTOMER_NAME = 'customerName';


//==============================================================================

//-- Get One -------------------------------------
export async function getOrder(orderId) {
    const order = await database(TABLE_ORDER)
        .where(field(TABLE_ORDER, FIELD_ID), orderId)
        .first()
        .join(
            TABLE_CUSTOMER,
            field(TABLE_ORDER, FIELD_CUSTOMER_ID),
            '=',
            field(TABLE_CUSTOMER, FIELD_ID),
        )
        .select(
            field(TABLE_ORDER, FIELD_ID),
            field(TABLE_ORDER, FIELD_CUSTOMER_ID),
            field(TABLE_ORDER, FIELD_CREATED),
            field(TABLE_ORDER, FIELD_SHIP_DATE),
            field(TABLE_ORDER, FIELD_STATUS),
            `${TABLE_CUSTOMER}.${FIELD_NAME} as ${FIELD_CUSTOMER_NAME}`,
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
            field(TABLE_ORDER, FIELD_CUSTOMER_ID),
            '=',
            field(TABLE_CUSTOMER, FIELD_ID),
        )
        .select(
            field(TABLE_ORDER, FIELD_ID),
            field(TABLE_ORDER, FIELD_CUSTOMER_ID),
            field(TABLE_ORDER, FIELD_CREATED),
            field(TABLE_ORDER, FIELD_SHIP_DATE),
            field(TABLE_ORDER, FIELD_STATUS),
            `${TABLE_CUSTOMER}.${FIELD_NAME} as ${FIELD_CUSTOMER_NAME}`,
        );
}

//-- Create New ----------------------------------
export async function createOrder(orderData) {
    //
    const recordData = {
        [FIELD_CUSTOMER_ID]: orderData[FIELD_CUSTOMER_ID],
        [FIELD_SHIP_DATE]: dateString(orderData[FIELD_SHIP_DATE]),
        [FIELD_CREATED]: dateString(new Date()),
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
        [FIELD_SHIP_DATE]: dateString(orderData[FIELD_SHIP_DATE]),
        [FIELD_CREATED]: dateString(orderData[FIELD_CREATED]),
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
