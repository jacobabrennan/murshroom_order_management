

//==============================================================================

//-- Dependencies --------------------------------
import {
    PARAM_WEEK
} from './urls_params.js';

//------------------------------------------------
export const API_AUTH_LOGIN = '/auth/login';
export const API_AUTH_REGISTER = '/auth/register';
export const API_AUTH_LOGOUT = '/auth/logout';

//------------------------------------------------
export const API_ORDER_ACTIVE = '/data/order/active';
export const API_ORDER_NEW = '/data/order';
export const API_ORDER_SINGLE = '/data/order';
export function MAKEURL_API_ORDER_SIGNLE(orderId) {
    return `${API_ORDER_SINGLE}/${orderId}`;
}

//------------------------------------------------
export const API_SPECIES_NEW = '/data/species';
export const API_SPECIES_EDIT = '/data/species';
export const API_SPECIES_ALL = '/data/species/all';
export function MAKEURL_API_SPECIES_EDIT(speciesId) {
    return `${API_SPECIES_EDIT}/${speciesId}`;
}

//------------------------------------------------
export const API_SCHEDULE_WEEK = '/data/schedule';
export function MAKEURL_API_SCHEDULE_WEEK(dateString) {
    return `${API_SCHEDULE_WEEK}?${PARAM_WEEK}=${dateString}`;
}

//------------------------------------------------
export const API_CUSTOMER_SUBMIT = '/data/customer';
const API_CUSTOMER_SEARCH = '/data/customer/search';
export function MAKEURL_API_CUSTOMER_SEARCH(searchString) {
    return `${API_CUSTOMER_SEARCH}?query=${searchString}`;
}
export function MAKEURL_API_CUSTOMER_SUBMIT(id) {
    return `${API_CUSTOMER_SUBMIT}/${id}`;
}
