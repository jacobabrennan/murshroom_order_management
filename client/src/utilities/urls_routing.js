

//==============================================================================

//------------------------------------------------
export const ROUTE_AUTH_BASE = '/auth';
export const ROUTE_AUTH_LOGIN = '/auth/login';
export const ROUTE_AUTH_REGISTER = '/auth/register';
export const ROUTE_AUTH_LOGOUT = '/auth/logout';

//------------------------------------------------
export const ROUTE_SCHEDULE_BASE = '/';

//------------------------------------------------
export const ROUTE_ORDER_BASE = '/order';
export const ROUTE_ORDER_NEW = '/order/new';
export const ROUTE_ORDER_SINGLE = ROUTE_ORDER_BASE;
export const ROUTE_ORDER_EDIT = `${ROUTE_ORDER_BASE}/edit`;
export function MAKEURL_ROUTE_ORDER_EDIT(orderId) {
    return `${ROUTE_ORDER_EDIT}/${orderId}`;
}
export function MAKEURL_ROUTE_ORDER_SINGLE(orderId) {
    return `${ROUTE_ORDER_SINGLE}/${orderId}`;
}

//------------------------------------------------
export const ROUTE_SPECIES_BASE = '/species';
export const ROUTE_SPECIES_NEW = '/species/new';
export const ROUTE_SPECIES_EDIT = '/species';
export function MAKEURL_ROUTE_SPECIES_EDIT(speciesId) {
    return `${ROUTE_SPECIES_EDIT}/${speciesId}`;
}

//------------------------------------------------
export const ROUTE_CUSTOMER_BASE = '/customer';
export const ROUTE_CUSTOMER_SINGLE = ROUTE_CUSTOMER_BASE;
export const ROUTE_CUSTOMER_NEW = `${ROUTE_CUSTOMER_BASE}/new`;
export const ROUTE_CUSTOMER_EDIT = `${ROUTE_CUSTOMER_BASE}/edit`;
export function MAKEURL_ROUTE_CUSTOMER_EDIT(customerId) {
    return `${ROUTE_CUSTOMER_EDIT}/${customerId}`;
}
export function MAKEURL_ROUTE_CUSTOMER_SINGLE(customerId) {
    return `${ROUTE_CUSTOMER_SINGLE}/${customerId}`;
}
