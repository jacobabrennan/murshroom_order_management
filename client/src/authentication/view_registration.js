

//== Registration Form =========================================================

//-- Dependencies --------------------------------
import React from 'react';
import { Link } from 'react-router-dom';
import usePost from '../utilities/use_post.js';
import { API_AUTH_REGISTER } from '../utilities/urls_api.js';
import { ROUTE_AUTH_LOGIN } from '../utilities/urls_routing.js';

//-- React Component -----------------------------
export default function ViewRegister({ onLogin }) {
    // Prepare API http request
    const [, triggerPost] = usePost(API_AUTH_REGISTER);
    // Submit interaction handler
    async function handleSubmit(eventSubmit) {
        eventSubmit.preventDefault();
        await triggerPost({
            userName: eventSubmit.currentTarget.elements.username.value,
            password: eventSubmit.currentTarget.elements.password.value,
            email: eventSubmit.currentTarget.elements.email.value,
        });
        onLogin();
    }
    // Render JSX
    return (
        <div className="auth_modal">
            <form className="auth_form" onSubmit={handleSubmit}>
                <span className="auth_prompt">Register</span>
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
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                />
                <div className="auth_actions">
                    <button className="button" type="submit" children="Submit" />
                    <Link
                        className="button secondary"
                        to={ROUTE_AUTH_LOGIN}
                        children="Log in"
                    />
                </div>
            </form>
        </div>
    );
}
