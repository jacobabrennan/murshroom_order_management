

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
import React, {
    createContext,
} from 'react';
import {
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import usePost from '../utilities/use_post.js';
import useGet from '../utilities/use_get';
import ViewRegister from './view_registration.js';
import ViewLogin from './view_login.js';
import Loading from '../components/loading/index.js';
import {
    URL_AUTH_LOGIN,
    URL_AUTH_REGISTER,
    URL_AUTH_LOGOUT,
} from '../utilities/urls_api.js';
import './index.css';

//-- Authentication Context ----------------------
const authenticationContext = createContext({
    userData: null,
});
export default authenticationContext;

//-- React Component -----------------------------
export function Authenticate({ children }) {
    // Query server for authentication data
    const response = useGet(URL_AUTH_LOGIN);
    const [, triggerLogout] = usePost(URL_AUTH_LOGOUT);
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
    if(response.data && response.data.username) {
        const authData = {
            username: response.data.username,
            onLogout: async function () {
                try {
                    await triggerLogout();
                    response.refetch();
                }
                catch(error) {
                    console.log(error)
                }
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
