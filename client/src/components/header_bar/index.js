

/*== Header Bar Component ======================================================

Exports a single React Component, HeaderBar. It displays a horizontal bar at the
top of client, containing branding, authentication actions (currently, log out),
and global links (currently, a link to the user's profile).

- Does not use any props.

*/

//-- Dependencies --------------------------------
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import authenticationContext from '../../authentication/index.js';
import {
    ROUTE_ORDER_BASE,
    ROUTE_SPECIES_BASE,
    ROUTE_SCHEDULE_BASE,
    ROUTE_CUSTOMER_BASE,
} from '../../utilities/urls_routing.js';
import './header_bar.css';

//-- Header Bar subcomponent ---------------------
export default function HeaderBar() {
    // Retrieve authentication data
    const authContext = useContext(authenticationContext);
    // Render JSX: Currently renders home & profile links, and a logout button.
    return (
        <nav className="headerbar">
            <Link
                children="Schedule"
                className="button"
                to={ROUTE_SCHEDULE_BASE}
            />  
            <Link
                children="Orders"
                className="button"
                to={ROUTE_ORDER_BASE}
            />  
            <Link
                children="Species"
                className="button"
                to={ROUTE_SPECIES_BASE}
            />  
            <Link
                children="Customers"
                className="button"
                to={ROUTE_CUSTOMER_BASE}
            />  
            <button
                children="Log Out"
                className="button danger"
                onClick={authContext.onLogout}
            />
        </nav>
    );
}
