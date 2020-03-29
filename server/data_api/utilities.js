

//== Data Access Constants =====================================================

//-- API urls and parameters ---------------------
export const PARAM_ID = 'id';
export const URL_CUSTOMER_BASE = '/customer';
export const URL_ORDER_BASE = '/order';
export const URL_SCHEDULE_BASE = '/schedule';
export const URL_SPECIES_BASE = '/species';
export const URL_CUSTOMER_SEARCH = '/search'
export const URL_CUSTOMER_SINGLE = `/:${PARAM_ID}`;
export const URL_CUSTOMER_NEW = '/';
export const URL_ORDER_ACTIVE = '/active';
export const URL_ORDER_SINGLE = `/:${PARAM_ID}`;
export const URL_ORDER_NEW = '/';
export const URL_SPECIES_LIST = '/all';
export const URL_SPECIES_SINGLE = '/:id';
export const URL_SPECIES_NEW = '/';

//-- Order Status --------------------------------
export const ORDER_STATUS_OPEN = 0;
export const ORDER_STATUS_SPAWNED = 1;
export const ORDER_STATUS_SHIPPED = 2;
export const ORDER_STATUS_PAID = 3;

//-- Database Tables -----------------------------
export const TABLE_CUSTOMER = 'customer';
export const TABLE_ORDER = 'order';
export const TABLE_ORDER_ITEM = 'orderItem';
export const TABLE_SPECIES = 'species';

//-- Database Fields ------------------------------
export const FIELD_AMOUNT = 'amount';
export const FIELD_CODE = 'code';
export const FIELD_CUSTOMER_ID = 'customerId';
export const FIELD_CREATED = 'created';
export const FIELD_ID = 'id';
export const FIELD_INCUBATION_TIME = 'incubationTime';
export const FIELD_LOCATION = 'location';
export const FIELD_NAME = 'name';
export const FIELD_ORDER_ID = 'orderId';
export const FIELD_QUANTITY = 'quantity';
export const FIELD_SHIP_DATE = 'shipDate';
export const FIELD_SPECIES = 'species';
export const FIELD_SPECIES_ID = 'speciesId';
export const FIELD_STATUS = 'status';
export const FIELD_STRAIN = 'strain';
export const FIELD_SUBSTRATE_FORMAT = 'substrateFormat';


//== Data Access Utility Functions =============================================

//------------------------------------------------
export function field(table, theField) {
    return `${table}.${theField}`;
}

//-- Date Manipulation ---------------------------
const DATE_REGEX = /([0-9]{4})-([0-9]{2})-([0-9]{2})/;
export function dateStringFix(theString) {
    const matches = DATE_REGEX.exec(theString);
    let year = matches[1];
    let month = matches[2];
    let date = matches[3];
    if(month.length === 1) { month = `0${month}`;}
    if(date.length === 1) { date = `0${date}`;}
    return `${year}-${month}-${date}`;
}
export function dateToString(theDate) {
    let dateYear = theDate.getFullYear();
    let dateMonth = theDate.getMonth()+1;
    let dateDate = theDate.getDate();
    if(dateMonth < 10) { dateMonth = `0${dateMonth}`;}
    if(dateDate < 10) { dateDate = `0${dateDate}`;}
    return `${dateYear}-${dateMonth}-${dateDate}`;
}
export function stringToDate(theString) {
    const matches = DATE_REGEX.exec(theString);
    const newDate = new Date();
    newDate.setTime(0);
    newDate.setFullYear(matches[1]);
    newDate.setMonth(matches[2]-1, 1);
    newDate.setDate(matches[3]);
    return newDate;
}
export function weekStart(theDate) {
    const dayOffset = theDate.getDay()-1;
    const monday = new Date(theDate);
    monday.setDate(monday.getDate() - dayOffset);
    return monday;
}
export function weekEnd(theDate) {
    const newDate = weekStart(theDate); // a Monday
    newDate.setDate(newDate.getDate() + 6); // a Sunday
    return newDate;
}
