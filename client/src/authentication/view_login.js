

//== Login Form ================================================================

//-- Dependencies --------------------------------
import React from 'react';
import { Link } from 'react-router-dom';
import usePost from '../utilities/use_post.js';
import { API_AUTH_LOGIN } from '../utilities/urls_api.js';
import { ROUTE_AUTH_REGISTER } from '../utilities/urls_routing.js';

//-- Log In Form ---------------------------------
export default function ViewLogin({ onLogin }) {
    // Attempt to login with server
    const [response, triggerPost] = usePost(API_AUTH_LOGIN);
    // Submit interaction handler
    async function handleSubmit(eventSubmit) {
        eventSubmit.preventDefault();
        await triggerPost({
            userName: eventSubmit.currentTarget.elements.username.value,
            password: eventSubmit.currentTarget.elements.password.value,
        });
        onLogin();
    }
    // Render JSX
    let error = response.error;
    if(!error && response.data) {
        error = response.data.error;
    }
    return (
        <div className="auth_modal">
            <form className="auth_form" onSubmit={handleSubmit}>
                {error}
                <span className="auth_prompt">Log in</span>
                <input
                    name="username"
                    type="text"
                    placeholder="User Name"
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                />
                <div className="auth_actions">
                    <button className="button" type="submit" children="Submit" />
                    <Link
                        className="button secondary"
                        to={ROUTE_AUTH_REGISTER}
                        children="Register"
                    />
                </div>
            </form>
        </div>
    );
}
