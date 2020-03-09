

//==============================================================================

//-- Dependencies --------------------------------
import React, { useRef } from 'react';
import { Link, useHistory, useParams, Redirect } from 'react-router-dom';
import Loading from '../components/loading/index.js';
import usePost from '../utilities/use_post.js';
import useGet from '../utilities/use_get.js';
import useFeedback from '../utilities/use_feedback.js';
import {
    ROUTE_CUSTOMER_BASE,
    INVALID_NO_NAME,
    INVALID_NO_LOCATION,
    API_CUSTOMER_SUBMIT,
    PARAM_ID,
} from './utilities.js';

//------------------------------------------------
export default function ViewEdit() {
    const formRef = useRef();
    const history = useHistory();
    const id = useParams()[PARAM_ID];
    const customerUrl = `${API_CUSTOMER_SUBMIT}/${id}`;
    const response = useGet(customerUrl)
    const [warnings, feedback] = useFeedback();
    const [postResponse, triggerPost] = usePost(customerUrl);
    //
    if(response.loading || postResponse.loading) {
        return (<Loading />);
    }
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
        if(!data.name) { problems.push(INVALID_NO_LOCATION);}
        if(problems.length) {
            feedback(problems);
            return;
        }
        //
        await triggerPost(data);
        history.push(ROUTE_CUSTOMER_BASE);
    }
    //
    const selection = response.data;
    if(!selection) {
        return (<Redirect to={ROUTE_CUSTOMER_BASE} />);
    }
    //
    return (
        <form ref={formRef} className="new-species" onSubmit={submitHandler}>
            <h1>Edit Customer: {id}</h1>
            <label>
                <span>Name</span>
                <input name="name" type="text" defaultValue={selection.name} />
            </label>
            <label>
                <span>Location</span>
                <input name="location" type="text" defaultValue={selection.location} />
            </label>
            {warnings}
            <div className="button-bar">
                <button className="button" type="submit" children="Submit" />
                <Link className="button danger" to={ROUTE_CUSTOMER_BASE} children="Cancel" />
            </div>
        </form>
    );
}
