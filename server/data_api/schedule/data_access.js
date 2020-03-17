

//==============================================================================

//-- Dependencies --------------------------------
import database from '../../database/index.js';
import {
    field,
    dateString,
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
} from '../utilities.js';

//-- Project Constants ---------------------------
const KNOCK_DATE = 'inoculationDate';


//==============================================================================

//------------------------------------------------
export async function getWeekProduction(week) {
    //
    const queryWeek = new Date(week);
    const startMonday = dateString(weekStart(queryWeek));
    const endSunday = dateString(weekEnd(queryWeek));
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
        )
        .whereRaw(`("shipDate") - (7 * "incubationTime") BETWEEN date '${startMonday}' AND date '${endSunday}'`);
    //
    const shipBlocks = await database(TABLE_ORDER_ITEM)
        .join(TABLE_ORDER,
            field(TABLE_ORDER_ITEM, FIELD_ORDER_ID), field(TABLE_ORDER, FIELD_ID)
        )
        .select(
            field(TABLE_ORDER_ITEM, '*'),
            field(TABLE_ORDER, FIELD_SHIP_DATE),
        )
        .whereBetween('shipDate', [startMonday, endSunday]);
    //
    for(const block of knockBlocks) {
        block.shipDate = dateString(block.shipDate);
    }
    for(const block of shipBlocks) {
        block.shipDate = dateString(block.shipDate);
    }
    //
    return {
        innoculate: knockBlocks,
        ship: shipBlocks,
    };
}
