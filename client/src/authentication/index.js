

/*== Authentication Client and route handler ===================================

This module exports a React context, authentication, which provides user data
for the currently logged in user.

This module also exports a React component, Authenticate, which acts as a
wrapper around the rest of the client. The component provides authentication
data to the authentication context when the user is logged in. Otherwise, it
displays registration and login views allowing the user to authenticate.
It accepts one prop, the standard React prop "children".

*/

//-- Dependencies --------------------------------
// NPM Modules
import React, {
    createContext,
} from 'react';
import {
    useHistory,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
// React Components
import ViewRegister from './view_registration.js';
import ViewLogin from './view_login.js';
// Styles
import useGet from '../utilities/use_get';
import './index.css';
import usePost from '../utilities/use_post.js';

//-- Project Constants ---------------------------
export const URL_AUTH_LOGIN = '/auth/login';
export const URL_AUTH_REGISTER = '/auth/register';
export const URL_AUTH_LOGOUT = '/auth/logout';

//-- Authentication Context ----------------------
const authenticationContext = createContext({
    userData: null,
});
export default authenticationContext;



//------------------------------------------------
function Loading() {
    return 'Loading';
}



//-- React Component -----------------------------
export function Authenticate({ children }) {
    // Query server for authentication data
    const history = useHistory();
    const response = useGet(URL_AUTH_LOGIN);
    const [, triggerLogout] = usePost(URL_AUTH_LOGOUT, {});
    //
    if(response.error) {
        return `Error: ${response.error}`;
    }
    // Display loading screen until authentication check completes
    if(response.loading) {
        return (<Loading />);
    }
    // Interpret response data
    // If authenticated, pass authentication data to wrapped components
    if(response.data.username) {
        const authData = {
            username: response.data.username,
            onLogout: async function () {
                await triggerLogout();
                history.push(URL_AUTH_LOGIN);
            },
        };
        return (
            <authenticationContext.Provider
                value={authData}
                children={children}
            />
        );
    }
    // Display authentication subclient
    return (
        <Switch>
            <Route exact path={URL_AUTH_LOGIN}>
                <ViewLogin onLogin={response.refetch} />
            </Route>
            <Route exact path={URL_AUTH_REGISTER}>
                <ViewRegister onLogin={response.refetch} />
            </Route>
            <Route path="/">
                <Redirect to={URL_AUTH_LOGIN} />
            </Route>
        </Switch>
    );
}
