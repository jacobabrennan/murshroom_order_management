

//==============================================================================

//-- URL Parameters ------------------------------
export { PARAM_ID } from '../utilities/urls_params.js';

//-- API URLs ------------------------------------
export {
    API_ORDER_ACTIVE,
    API_ORDER_NEW,
    API_ORDER_SINGLE,
} from '../utilities/urls_api.js';

//-- Routing URLs, and Parameters ----------------
export {
    ROUTE_ORDER_BASE,
    ROUTE_ORDER_NEW,
    ROUTE_ORDER_SINGLE,
    ROUTE_ORDER_EDIT,
} from '../utilities/urls_routing.js';

//-- Error Messages ------------------------------
export const INVALID_NO_CUSTOMER = 'You must select a customer.';
export const INVALID_NO_SHIPDATE = 'You must select a ship date.';
export const INVALID_NO_PRODUCTS = 'You must add at least one product.';
