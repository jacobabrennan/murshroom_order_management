

//== Project Constants =========================================================

//-- API URLs ------------------------------------
export { API_SCHEDULE_WEEK } from '../utilities/urls_api.js';
export { PARAM_WEEK } from '../utilities/urls_params.js';

//-- Route URLS ----------------------------------
export {
    ROUTE_ORDER_BASE,
    ROUTE_SPECIES_BASE,
} from '../utilities/urls_routing.js';

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
