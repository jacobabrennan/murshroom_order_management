

//==============================================================================

//-- Dependencies --------------------------------
import React, { useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import usePost from '../utilities/use_post.js';
import useFeedback from '../utilities/use_feedback.js';
import { API_CUSTOMER_NEW } from '../utilities/urls_api.js';
import { ROUTE_CUSTOMER_BASE } from '../utilities/urls_routing.js';
import {
    INVALID_NO_NAME,
    INVALID_NO_LOCATION,
} from './utilities';
import Loading from '../components/loading/index.js';

//------------------------------------------------
export default function ViewNew() {
    const formRef = useRef();
    const history = useHistory();
    const [response, triggerPost] = usePost(API_CUSTOMER_NEW);
    const [warnings, feedback] = useFeedback();
    //
    async function submitHandler(eventSubmit) {
        eventSubmit.preventDefault();
        //
        const recordForm = formRef.current;
        let data = {
            name: recordForm.elements['name'].value,
            location: recordForm.elements['location'].value,
        }
        //
        let problems = [];
        if(!data.name) { problems.push(INVALID_NO_NAME);}
        if(!data.location) { problems.push(INVALID_NO_LOCATION);}
        if(problems.length) {
            feedback(problems);
            return;
        }
        //
        await triggerPost(data);
        history.push(ROUTE_CUSTOMER_BASE);
    }
    //
    if(response.loading) {
        return (<Loading />);
    }
    //
    return (
        <form ref={formRef} className="big-form" onSubmit={submitHandler}>
            <h1 className="action-attach">
                <span className="action-attach__text">New Customer</span>
            </h1>
            <label>
                <span>Customer Name</span>
                <input name="name" type="text" />
            </label>
            <label>
                <span>Location</span>
                <input name="location" type="text" />
            </label>
            {warnings}
            <div className="button-bar">
                <button className="button" type="submit" children="Submit" />
                <Link className="button danger" to={ROUTE_CUSTOMER_BASE} children="Cancel" />
            </div>
        </form>
    );
}
