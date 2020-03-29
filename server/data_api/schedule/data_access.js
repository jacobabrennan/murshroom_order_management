

//==============================================================================

//-- Dependencies --------------------------------
import database from '../../database/index.js';
import {
    field,
    dateToString,
    stringToDate,
    weekStart,
    weekEnd,
    TABLE_ORDER_ITEM,
    TABLE_ORDER,
    TABLE_SPECIES,
    FIELD_ORDER_ID,
    FIELD_ID,
    FIELD_SPECIES_ID,
    FIELD_SHIP_DATE,
    FIELD_INCUBATION_TIME,
    FIELD_AMOUNT,
    FIELD_QUANTITY,
    TABLE_CUSTOMER,
    FIELD_CUSTOMER_ID,
    FIELD_NAME,
    FIELD_CODE,
    FIELD_SUBSTRATE_FORMAT,
} from '../utilities.js';

//-- Project Constants ---------------------------
const KNOCK_DATE = 'inoculationDate';
const ERROR_INVALID_DATE = 'Invalid Date: date must be in YYYY-MM-DD format.';


//==============================================================================

//------------------------------------------------
export async function getWeekProduction(week) {
    //
    const queryWeek = stringToDate(week);
    if(isNaN(queryWeek)) { throw ERROR_INVALID_DATE;}
    const startMonday = dateToString(weekStart(queryWeek));
    const endSunday = dateToString(weekEnd(queryWeek));
    //
    const knockBlocks = await database(TABLE_ORDER_ITEM)
        .join(TABLE_ORDER,
            field(TABLE_ORDER_ITEM, FIELD_ORDER_ID), field(TABLE_ORDER, FIELD_ID)
        )
        .join(TABLE_SPECIES,
            field(TABLE_ORDER_ITEM, FIELD_SPECIES_ID), field(TABLE_SPECIES, FIELD_ID)
        )
        .select(
            field(TABLE_ORDER_ITEM, '*'),
            field(TABLE_ORDER, FIELD_SHIP_DATE),
            field(TABLE_SPECIES, FIELD_INCUBATION_TIME),
            field(TABLE_SPECIES, FIELD_CODE),
            field(TABLE_SPECIES, FIELD_SUBSTRATE_FORMAT),
        )
        .whereRaw(`("shipDate") - (7 * "incubationTime") BETWEEN date '${startMonday}' AND date '${endSunday}'`);
    //
    const shipBlocks = await database(TABLE_ORDER_ITEM)
        .join(TABLE_ORDER,
            field(TABLE_ORDER_ITEM, FIELD_ORDER_ID), field(TABLE_ORDER, FIELD_ID)
        )
        .join(TABLE_CUSTOMER,
            field(TABLE_ORDER, FIELD_CUSTOMER_ID), field(TABLE_CUSTOMER, FIELD_ID)
        )
        .join(TABLE_SPECIES,
            field(TABLE_ORDER_ITEM, FIELD_SPECIES_ID), field(TABLE_SPECIES, FIELD_ID)
        )
        .select(
            field(TABLE_ORDER_ITEM, '*'),
            field(TABLE_ORDER, FIELD_SHIP_DATE),
            field(TABLE_ORDER, FIELD_CUSTOMER_ID),
            field(TABLE_CUSTOMER, FIELD_NAME),
            field(TABLE_SPECIES, FIELD_CODE),
        )
        .whereBetween('shipDate', [startMonday, endSunday]);
    //
    for(const block of knockBlocks) {
        block.shipDate = dateToString(block.shipDate);
    }
    for(const block of shipBlocks) {
        block.shipDate = dateToString(block.shipDate);
    }
    //
    return {
        inoculate: knockBlocks,
        ship: shipBlocks,
    };
}
